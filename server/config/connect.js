import { createPool } from "mysql";
/**
 * Cloud connection
 */
// const pool = createPool({
//   host: "sql8.freemysqlhosting.net",
//   user: "sql8611991",
//   password: "PQEC8KeGuI",
//   connectionLimit: 10,
//   database:"sql8611991"
// });

/**
 * Local connection
 */
const pool = createPool({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "1234",
  connectionLimit: 10,
  database: "knesset",
  port: "3307",
});

export default pool;
