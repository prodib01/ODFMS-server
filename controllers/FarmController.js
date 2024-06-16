const jwt = require("jsonwebtoken");
const farmModel = require('../models/Farm');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
destination: function (req, file, callback) {
callback(null, './uploaded_files/') // Specify the destination directory for uploaded files
},
filename: function (req, file, cb) {
//generate file name
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
const fileName = uniqueSuffix + '.' + file.originalname.split('.')[1]
cb(null, fileName)
}
});

const upload = multer({ storage: storage }).single('logo'); // Specify the field name for the file input

const addFarm = async (req, res) => {
try {
upload(req, res, async function (err) {
if (err instanceof multer.MulterError) {
// A Multer error occurred when uploading
console.error("Multer error:", err);
return res.status(400).json({ error: 'File upload error' });
} else if (err) {
// An unknown error occurred when uploading
console.error("Unknown error:", err);
return res.status(500).json({ error: 'Internal server error' });
}


  // File upload was successful, continue with adding farm details
  const { farm_name, location } = req.body;
  // Check if 'Authorization' header exists
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const decoded = jwt.decode(token);
  const farm_owner = decoded.userId;
  // The folder where the files are saved
  // Construct the file path with the desired format
  const filePath = `/uploaded_files/${req.file.filename}`;
  await farmModel.addFarm(farm_name, farm_owner, location, filePath);
  return res.status(201).json('Farm added successfully');
});
} catch (error) {
console.error("Error adding farm:", error);
return res.status(500).json({ error: 'Internal server error' });
}
};

const path = require('path');
const fs = require('fs');

const serveImage = async (req, res) => {
const filename = req.params.filename;
const filepath = path.join(__dirname, './uploaded_files', filename);

// Check file existence
if (fs.existsSync(filepath)) {
// Read the file and send it in the response
fs.readFile(filepath, (err, data) => {
if (err) {
console.error("Error reading file:", err);
return res.status(500).json({ error: 'Internal server error' });
}
// Set appropriate content type for the response
res.set('Content-Type', 'image/png'); // Adjust content type based on file type
res.send(data);
});
} else {
return res.status(404).json({ error: 'File not found' });
}
};

const getMyFarmDetails = async (req, res) => {
try {
// Check if 'Authorization' header exists
const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
if (!token) {
return res.status(401).json({ error: 'Unauthorized' });
}
const decoded = jwt.decode(token);
const farm_owner = decoded.userId;
// Fetch the farm details for the logged-in user
const farmDetails = await farmModel.getFarmDetailsByOwner(farm_owner);


if (!farmDetails) {
  return res.status(404).json({ error: 'Farm details not found' });
}

// Extract logo and farm name from farm details
const { logo, farm_name } = farmDetails;

// Return the logo and farm name
return res.status(200).json({ logo, farm_name });
} catch (error) {
console.error("Error fetching farm details:", error);
return res.status(500).json({ error: 'Internal server error' });
}
};

module.exports = {
addFarm,
serveImage,
getMyFarmDetails
};