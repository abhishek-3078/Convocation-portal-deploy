const express = require("express");
const router = express.Router();
const alumniController = require("../controller/alumniController"); // Adjust the path as necessary

// Route to create a new alumni with file upload handling
router.post("/", alumniController.uploadAlumniFiles, alumniController.createAlumni);

// Route to get all alumni
router.get("/", alumniController.getAllAlumni);

// Route to get an alumni by ID
router.get("/:id", alumniController.getAlumniById);

// Route to update an alumni by ID
router.put("/:id", alumniController.updateAlumni);

// Route to delete an alumni by ID
router.delete("/:id", alumniController.deleteAlumni);

module.exports = router;
