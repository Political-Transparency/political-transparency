const pool = require("./connect");

function validate(billName) {
  var newStr = billName.replace("'", '"');
  return newStr;
}

const insertKnessetMemberRow = (memberID, memberName, isActive) => {};
const insertBillRow = async (billID, billName, knessetNum) => {
  const billNameValidator = validate(billName);
  const sql = `INSERT INTO bill_names(id, name, knesset_num) VALUES (${billID}, ' ${billNameValidator} ', ${knessetNum})`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
  });
};
const insertVoteForBillRow = (billID, memberID, voteValue) => {};

module.exports = {
  insertBillRow,
  insertKnessetMemberRow,
  insertVoteForBillRow,
};
