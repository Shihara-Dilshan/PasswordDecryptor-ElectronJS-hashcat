const express = require("express");
const { exec } = require("child_process");
const { join } = require("path");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT || 54774;
const app = express();

app.use(cors());
app.use(express.static(join(__dirname, "static")));

app.get("/api/v2/hash/:hashtype/:hashcode/:attacktype", (req, res) => {
  console.log(req.params.hashcode);
  console.log(req.params.hashtype);
  console.log(req.params.attacktype);

  fs.writeFile(
    join(__dirname, `/hash/hashes.txt`),
    req.params.hashcode,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("write success");
      }
    }
  );
  exec(
    join(
      __dirname,
      `/hash/hashcrack.sh ${req.params.hashcode} ${req.params.hashtype} ${req.params.attacktype}`
    ),
    (err, stdout, stderr) => {
      res.status(200).json({ output: stdout, error: null });
    }
  );
});

app.get("/api/v2/guess/:guesses", (req, res) => {
  console.log(req.params.guesses);

  fs.appendFile(
    join(__dirname, `/hash/mine2.txt`),
    `${req.params.guesses}\n`,
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("append success");
      }
    }
  );
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
