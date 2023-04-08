const xml2js = require("xml2js");
const database = require("./database");

const xmlParser = async (res, response) => {
  const xml = await response.text();
  const parser = xml2js.Parser();
  let xmlResult;
  parser.parseString(xml, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ err: err.massage });
    }
    xmlResult = result;
  });
  return xmlResult;
};

const getBillsByKnessetNum = async (req, res) => {
  const knessetNum = req.params.knessetNum;
  const response = await fetch(
    `http://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Bill()?$filter=KnessetNum%20eq%20${knessetNum}`
  );
  const result = xmlParser(res, response);
  const entries = result["feed"]["entry"];
  entries.map((entry) =>
    database.insertBillRow(
      entry["content"][0]["m:properties"][0]["d:BillID"][0]["_"],
      typeof entry["content"][0]["m:properties"][0]["d:Name"][0] === "string"
        ? entry["content"][0]["m:properties"][0]["d:Name"][0]
        : entry["content"][0]["m:properties"][0]["d:Name"][0]["_"],
      entry["content"][0]["m:properties"][0]["d:KnessetNum"][0]["_"]
    )
  );
  return res.status(200).json({ result });
};
const getKnessetMembers = async (req, res) => {
  const response = fetch(
    `http://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_PersonToPosition()?$filter=PositionID%20eq%2043%20&%20PositionID%20eq%2061%20&$expand=KNS_Person`
  );
  const result = xmlParser(res, response);
};
module.exports = { getBillsByKnessetNum };
