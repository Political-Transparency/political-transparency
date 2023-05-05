import xml2js from "xml2js";
import {
  insertBillRow,
  insertKnessetMemberRow,
  insertVoteForBillRow,
  updateVoteId,
} from "../config/database.js";

export const xmlParser = (xml) => {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const billUrl = `http://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Bill()`;
const count = 100;

const fetchBills = async (res, skip, knessetNum) => {
  try {
    const response = await fetch(
      `${billUrl}?$filter=KnessetNum%20eq%20${knessetNum}&$skip=${skip}&count=${count}`
    );
    const xml = await response.text();

    const result = await xmlParser(xml);
    // parser.parseString(xml, (err, result, res) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ err: err.message });
    //   }
    //   xmlResult = result;
    // });
    const entries = await result["feed"]["entry"];
    if (!entries) {
      return; // All bills have been fetched
    }
    // Map the entries to an array of bill objects
    const bills = entries.map((entry) => {
      return {
        billId: entry["content"][0]["m:properties"][0]["d:BillID"][0]["_"],
        name:
          typeof entry["content"][0]["m:properties"][0]["d:Name"][0] ===
          "string"
            ? entry["content"][0]["m:properties"][0]["d:Name"][0]
            : entry["content"][0]["m:properties"][0]["d:Name"][0]["_"],
        knessetNum:
          entry["content"][0]["m:properties"][0]["d:KnessetNum"][0]["_"],
      };
    });
    for (let bill of bills) {
      await insertBillRow(bill.billId, bill.name, bill.knessetNum);
    } // Insert the bills into the database

    // Fetch the next batch of bills recursively
    return fetchBills(res, skip + count, knessetNum);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ err: err.message + `${skip}` });
  }
};

export const getBillsByKnessetNum = async (req, res) => {
  let knessetNum = 1;
  while (knessetNum <= 25) {
    await fetchBills(res, 0, knessetNum);
    knessetNum++;
  }
  // Insert all the bills into the database
  // for (const bill of allBills) {
  //   await database.insertBillRow(bill.billId, bill.name, bill.knessetNum);
  // }

  return res.status(200).json({ success: true });
};

export const getKnessetMembers = async (req, res) => {
  let skip = 0;
  const pageSize = 100;
  let hasMoreData = true;
  try {
    while (hasMoreData) {
      const response = await fetch(
        `http://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition()?$filter=PositionID%20eq%2043%20or%20PositionID%20eq%2061&$expand=KNS_Person&$skip=${skip}`
      );
      const xml = await response.text();
      result = await xmlParser(xml);
      const entries = result["feed"]["entry"];
      if (!entries) {
        break;
      } else {
        skip += pageSize;
      }
      const knessetMembers = entries.map((entry) => {
        return {
          id: entry["link"][1]["m:inline"][0]["entry"][0]["content"][0][
            "m:properties"
          ][0]["d:PersonID"][0]["_"],
          fullName:
            entry["link"][1]["m:inline"][0]["entry"][0]["content"][0][
              "m:properties"
            ][0]["d:FirstName"][0] +
            " " +
            entry["link"][1]["m:inline"][0]["entry"][0]["content"][0][
              "m:properties"
            ][0]["d:LastName"][0],
          isActive:
            entry["link"][1]["m:inline"][0]["entry"][0]["content"][0][
              "m:properties"
            ][0]["d:IsCurrent"][0]["_"],
        };
      });
      for (let member of knessetMembers) {
        await insertKnessetMemberRow(
          member.id,
          member.fullName,
          member.isActive.toString()
        );
      }
    }

    // return res.status(404).json({ error: error.message });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
  return res.status(200).json({ result: "succeed" });
};
const getBillVoteId = async (billId) => {
  const url = `http://knesset.gov.il/Odata/Votes.svc/View_vote_rslts_hdr_Approved?$filter=sess_item_id%20eq%20${billId}%20`;
  const response = await fetch(url);
  const toXmlParser = await response.text();
  const data = await xmlParser(toXmlParser);
  if (data) {
    const entry = data["feed"]["entry"];
    const voteId =
      entry[0]["content"][0]["m:properties"][0]["d:vote_id"][0]["_"];
    return voteId;
  }
  return undefined;
};
// http://knesset.gov.il/Odata/Votes.svc/View_vote_rslts_hdr_Approved?$filter=sess_item_id%20eq%20565532%20 need to extract from here the vote_id by using the bill_id as sess_item_id

// http://knesset.gov.il/Odata/Votes.svc/vote_rslts_kmmbr_shadow?$filter=vote_id%20eq%2031173 odata query to get who voted using vote_id
export const getVotes = async (req, res) => {
  try {
    const { billId: billId } = req.query;
    const voteId = await getBillVoteId(billId);
    await updateVoteId(billId, voteId);
    const url = `http://knesset.gov.il/Odata/Votes.svc/vote_rslts_kmmbr_shadow?$filter=vote_id%20eq%20${voteId}`; // odata query to get who voted using vote_id
    const response = await fetch(url);
    const toXmlParser = await response.text();
    const data = await xmlParser(toXmlParser);
    // console.log(data["feed"]["entry"][0]["content"][0]["m:properties"][0]);
    return res.status(200).json({ result: "success" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
