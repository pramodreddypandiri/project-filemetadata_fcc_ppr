var express = require('express');
var cors = require('cors');
const multer = require('multer'); // For handling file uploads
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.file;
  const fileSize = file.size;
  const filename = file.originalname;

  res.json({
    name: filename,
    type: file.mimetype,
    size: fileSize,
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
