const xml2js = require("xml2js");

const getBillsByKnessetNum = async (req, res) => {
  try {
    const knessetNum = req.params.knessetNum;
    const response = await fetch(
      `http://knesset.gov.il/Odata/ParliamentInfo.svc/KNS_Bill()?$filter=KnessetNum%20eq%20${knessetNum}`
    );
    const xml = await response.text();
    const parser = xml2js.Parser();
    parser.parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err: err.massage });
      }

      const entries = result['feed']['entry']
      const ids = entries.map(
        (entry) => entry['content'][0]['m:properties'][0]['d:Name'][0]
      );
      console.log(ids);
      return res.status(200).json({ result });
    });
  } catch (error) {
    console.error(error.massage);
    return res.status(500).json({ error: error.message });
  }
};
module.exports = { getBillsByKnessetNum };
