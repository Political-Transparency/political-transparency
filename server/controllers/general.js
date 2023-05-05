import pool from "../config/connect.js";

export const getBillsData = async (req, res) => {
  try {
    pool.query(
      "SELECT * FROM knesset.bills",
      function (error, results, fields) {
        if (error) return res.status(404).json({ error: error.message });

        // Transform the results into an array
        const data = results.map((row) => ({
          label: row.name,
          id: row.id,
        }));

        // Return the data as a JSON array
        res.status(200).json(data);
      }
    );
  } catch (error) {
    res.status(404).json(error);
  }
};
