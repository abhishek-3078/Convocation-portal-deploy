const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const User = require('../Model/user');
const jwt = require('jsonwebtoken');
const { isAuth } = require('../middleware/auth');
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUD_SECRET
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'uploads',  // Folder in Cloudinary to store files
//       allowedFormats: ['jpg', 'png', 'pdf'], // Allowed file formats
//     },
//   });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log("incoming request:",req.query.folder)
        // Use folder path from req.body, default to 'uploads' if not provided
        const folderName = req.query.folder || 'uploads';
        
        return {
            folder: folderName,
            allowedFormats: ['jpg', 'png', 'pdf'], // Allowed file formats
        };
    },
});

  

const upload = multer({ storage});

router.get('/', (req, res) => {
    console.log(req.headers)
    const authHeader = req.headers['authorization'];
    const token = authHeader; // Extract the token from the header
    console.log(token)
    res.send('Hello from the greet route!');
});


router.post('/', (req, res, next) => {
    const authHeader = req.headers['authorization'];
        const token = authHeader; // Extract the token from the header
    console.log("token:",token)
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }

        let email;
        try {
            const decoded = jwt.verify(token, process.env.token); // Replace with your secret
            console.log(decoded)
            email = decoded.email; // Assuming the token contains an 'email' field
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'Invalid token.' });
        }
        res.send("FDafasdfs")
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        console.log("error aayi h",err.message)
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // Handle other possible errors
        console.log(err)
        return res.status(500).json({ message: 'An error occurred during upload' });
      }
      // Proceed if upload was successful
      res.json({
        message: 'invitation card  uploaded successfully!',
        fileInfo: req.file,
      });
    });
  });
  router.get('/profilePhoto',isAuth, async (req, res) => {
    const id=req.user.id
    const user=await User.findById(id)
    console.log(user)
    return res.json({profileUrl:user.profileUrl})
  
  })
  router.post('/profileUpload', isAuth,upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        
        const id=req.user.id
        const {  path,filename } = req.file;
        console.log(id)
        // Create a new entry in MongoDB
        const updatedFile=await User.findByIdAndUpdate(id, { profilePhotoName: filename, profileUrl: path }, { new: true });
        
        console.log(updatedFile)
        
     

        res.json({
            message: 'File uploaded successfully!',
            fileInfo: req.file,
        });
    } catch (error) {
        console.error('Error saving file to MongoDB:', error);
        res.status(500).json({ message: 'An error occurred while saving file information.' });
    }
});
  router.post('/receipts', isAuth,upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        
        const id=req.user.id
        const {  path,filename } = req.file;
        console.log(id)
        // Create a new entry in MongoDB
        const updatedFile=await User.findByIdAndUpdate(id, { profilePhotoName: filename, profileUrl: path }, { new: true });
        
        console.log(updatedFile)
        
     

        res.json({
            message: 'File uploaded successfully!',
            fileInfo: req.file,
        });
    } catch (error) {
        console.error('Error saving file to MongoDB:', error);
        res.status(500).json({ message: 'An error occurred while saving file information.' });
    }
});
module.exports = router;
