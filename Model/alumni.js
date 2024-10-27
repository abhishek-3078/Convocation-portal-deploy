const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
    },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    enrollmentNo: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    currentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    fieldOfWork: { type: String, required: true },
    package: { type: String, required: true },
    occupation: { type: String, required: true },
    higherStudiesCourse: { type: String },
    specialization: { type: String },
    university: { type: String },
    universityAddress: { type: String },
    employer: { type: String },
    jobDesignation: { type: String },
    officePhone: { type: String },
    officeEmail: { type: String },
    photo: { type: String , required : true}, // Use String to store the file path or URL
    signature: { type: String , required : true}, // Use String to store the file path or URL,
    rollNumber : {type : String , required : true , unique : true} ,
    batch : {type : String}
});

// Export Alumni model
const Alumni = mongoose.model("Alumni", alumniSchema);
module.exports = Alumni;
