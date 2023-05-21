const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const retrieveData = require("./retrieveData");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.get("/", (req, res) => {
  res.send("hello");
});
app.get("/api/bills/:knessetNum",retrieveData.getBillsByKnessetNum);
const port = 8080;

app.listen(port, () => {
  console.log(`server is listening http://localhost:${port}`);
});
