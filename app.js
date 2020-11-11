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
      `/hash/hashcrack.sh ${req.params.hashtype}`
    ),
    (err, stdout, stderr) => {
      res.status(200).json({ output: stdout, error: null });
    }
  );
});

app.get("/api/v2/viewlist", (req, res) => {

  exec(
    join(
      __dirname,
      `/hash/viewlist.sh ${__dirname}`
    ),
    (err, stdout, stderr) => {
      res.status(200).json({ output: stdout, error: null });
    }
  );
});

app.get('/api/v2/analizer/analize/:hashcode', (req, res) => {
  exec(join(__dirname, `/hash/analize.sh ${req.params.hashcode}`), (err, stdout, stderr) => {
    if (err) {
      return res.status(400).json({ output: null, error: err.message })
    }

    res.status(200).json({ output: stdout, error: null })
  })
})



app.get("/api/v2/readfile", (req, res) => {


  const a = fs.readFileSync(
    join(__dirname, `/hash/mine.txt`),
    function (err, data) {
          console.log(data.toString())
        res.status(200).json({ output: data.toString(), error: null });
      
    }
  );

  res.status(200).json({ output: a.toString(), error: null });
});

app.get("/api/v2/guess/:guesses", (req, res) => {
  console.log(req.params.guesses);

  fs.appendFile(
    join(__dirname, `/hash/mine2.txt`),
    `${req.params.guesses}\n`,
    function (err) {
      
        res.status(200).json({ output: "success", error: null });
      
    }
  );
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
