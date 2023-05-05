import pool from "../config/connect.js";

function validate(valid) {
  let newStr = valid.replace(/[\'\"]+/g, "");
  return newStr;
}
const SQL_CHECKING_QUERY = "SELECT COUNT(*) FROM";

export const insertKnessetMemberRow = async (
  memberID,
  memberName,
  isActive
) => {
  pool.query(
    `${SQL_CHECKING_QUERY} knesset_members where id = ${memberID}`,
    (err, result) => {
      if (err) throw err;
      console.log(result[0]["COUNT(*)"] === 0);
      if (result[0]["COUNT(*)"] === 0) {
        memberName = validate(memberName);
        const sql = `INSERT INTO knesset_members(id, fullName, isActive) VALUES (${memberID}, '${memberName}', ${isActive})`;
        pool.query(sql, (err, result) => {
          if (err && err.code == "ER_DUP_ENTRY") {
            console.log(`Id: ${memberID} already inserted to the db`);
          } else if (err) {
            throw err;
          }
          console.log("Succeed insert into knesset_members new knesset member");
        });
      } else {
        console.log(`Id: ${memberID} already inserted to the db`);
      }
    }
  );
};

export const insertBillRow = async (billID, billName, knessetNum) => {
  pool.query(
    `${SQL_CHECKING_QUERY} bills WHERE id = ${billID}`,
    (err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0]["COUNT(*)"] === 0) {
          const billNameValidator = validate(billName);
          const sql = `INSERT INTO bills(id, name, knesset_num) VALUES (${billID}, '${billNameValidator}', ${knessetNum})`;
          pool.query(sql, (err, result) => {
            if (err) {
              console.log(billNameValidator);
              console.log(billNameValidator.length);
              console.log("Is here the problem?");
              throw err;
            }
            // console.log(`Inserted Row with ID: ${billID}`);
          });
        } else {
          if (result.find((item) => item.name === billName)) {
            const valid = billNameValidator(item.name);
            pool.query(
              `UPDATE bills SET name = ${valid} WHERE id = ${billID}`,
              (err, result) => {
                if (err) throw err;
                // console.log(`Updated Row with ID: ${billID}`);
              }
            );
          }
        }
      }
    }
  );
};

export const updateVoteId = async (billId, voteId) => {
  try {
    const result = await pool.query(
      `SELECT vote_id FROM bills WHERE id = ${billId}`
    );
    if (!result.vote_id) {
      const sql = `UPDATE bills SET vote_id = ${voteId} WHERE id = ${billId}`;
      await pool.query(sql);
      console.log(`Updated successfully vote_id to bill_id: ${billId}`);
    } else {
      console.log(`The bill with id ${billId} already has a vote_id`);
    }
  } catch (err) {
    console.log(`Failed to update property vote_id in ${billId}`);
    throw err;
  }
};

export const insertVoteForBillRow = (billID, memberID, voteValue) => {};
