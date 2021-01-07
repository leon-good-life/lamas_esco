const fs = require("fs");
const csv = require("csvtojson/v2");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("../frontend"));

app.get("/lamas_esco", function (req, res) {
  const CSV_FILE_PATH = "lamas_esco2.csv";

  csv()
    .fromFile(CSV_FILE_PATH)
    .then((lamasEscoArr) => {
      const filtered = lamasEscoArr.map(
        ({ lamas_name, preferredLabel, ...obj }) => ({
          lamas_name,
          preferredLabel,
          avgAll3Scores: obj["Avg All 3 Scores"],
        })
      );
      res.json(filtered);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const convertCsvToJson = () => {
  const CSV_FILE_PATH = "lamas_esco.csv";
  const JSON_FILE_PATH = "lamas_esco.json";

  csv()
    .fromFile(CSV_FILE_PATH)
    .then((jsonObj) => {
      console.log(jsonObj);
      fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(jsonObj));
    });
};
