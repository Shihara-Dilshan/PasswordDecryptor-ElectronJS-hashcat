const express = require('express');
const { exec } = require('child_process');
const { join } = require('path');
const cors = require('cors');

const port = process.env.PORT || 54774
const app = express();

app.use(cors());
app.use(express.static(join(__dirname, 'static')))



app.get('/api/v2/hash/:hashtype/:hashcode', (req, res) => {
  exec(join(__dirname, `/hash/hashcrack.sh ${req.params.hashcode}`), (err, stdout, stderr) => {
  
    res.status(200).json({ output: stdout, error: null })
  })
})


app.listen(port, () => {
  console.log('server listening on port', port)
})
