const Alumni = require("../Model/alumni.js"); // Adjust the path as necessary
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files to "uploads" directory
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Middleware to handle multipart form data, including files
module.exports.uploadAlumniFiles = upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 }
]);

// Create alumni and save document with file paths
module.exports.createAlumni = async (req, res) => {
    const { userId, ...alumniData } = req.body;

    try {
        // Get file paths for photo and signature
        console.log(req.body);
        const photoPath = req.files.photo ? req.files.photo[0].path : null;
        const signaturePath = req.files.signature ? req.files.signature[0].path : null;

        const newAlumni = new Alumni({
            user: userId,
            ...alumniData,
            photo: photoPath,
            signature: signaturePath
        });

        await newAlumni.save();
        res.status(201).json({ message: "Alumni registered successfully!", alumni: newAlumni });
    } catch (error) {
        console.error("Error registering alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all alumni
module.exports.getAllAlumni = async (req, res) => {
    try {
        const alumni = await Alumni.find().populate("user", "email"); // Populate user field
        res.status(200).json(alumni);
    } catch (error) {
        console.error("Error fetching alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get alumni by ID
module.exports.getAlumniById = async (req, res) => {
    const { id } = req.params;

    try {
        const alumni = await Alumni.findById(id).populate("user", "email");
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json(alumni);
    } catch (error) {
        console.error("Error fetching alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update alumni by ID
module.exports.updateAlumni = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const alumni = await Alumni.findByIdAndUpdate(id, updates, { new: true });
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json({ message: "Alumni updated successfully!", alumni });
    } catch (error) {
        console.error("Error updating alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete alumni by ID
module.exports.deleteAlumni = async (req, res) => {
    const { id } = req.params;

    try {
        const alumni = await Alumni.findByIdAndDelete(id);
        if (!alumni) {
            return res.status(404).json({ message: "Alumni not found" });
        }
        res.status(200).json({ message: "Alumni deleted successfully" });
    } catch (error) {
        console.error("Error deleting alumni:", error);
        res.status(500).json({ message: "Server error" });
    }
};
