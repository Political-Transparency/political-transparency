const pool = require("./connect");

const insertKnessetMemberRow = (id, memberName, isActive) => {

};
const insertBillRow = (billID, billName, knessetNum) => {

};
const insertVoteForBillRow = (billID, memberID, voteValue) => {

};

module.exports = {
    insertBillRow,
    insertKnessetMemberRow,
    insertVoteForBillRow
}