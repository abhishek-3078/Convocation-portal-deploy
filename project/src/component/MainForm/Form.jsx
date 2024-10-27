import React, { useState } from 'react';
import styles from './Form.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const AlumniForm = () => {
  const {rollNumber , batch} = useLocation().state;
  const [auth,setAuth]=useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    course: '',
    branch: '',
    enrollmentNo: '',
    yearOfPassing: '',
    mobile: '',
    email: '',
    currentAddress: '',
    permanentAddress: '',
    fieldOfWork: '',
    package: '',
    occupation: '',
    higherStudiesCourse: '',
    specialization: '',
    university: '',
    universityAddress: '',
    employer: '',
    jobDesignation: '',
    officePhone: '',
    officeEmail: '',
    photo: null,
    signature: null,
    rollNumber: rollNumber,
    batch: batch,
    
    department: "",
    bloodGroup: "",
    employmentStatus: "",
    jobs: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      let maxSize = 0;

      // Set maxSize based on the input name
      if (name === 'photo') {
        maxSize = 50 * 1024; // 50KB
      } else if (name === 'signature') {
        maxSize = 20 * 1024; // 20KB
      }

      // Check if the file size exceeds the maxSize
      if (file && file.size > maxSize) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} size exceeds the maximum limit of ${maxSize / 1024}KB.`,
        }));
        return;
      } else {
        // Clear any previous error for this input
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }

      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required.';
    if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      let response = await fetch('http://localhost:8080/api/v1/alumni?folder=profile', {
        method: 'POST',
        headers:{
          "Authorization" : auth?.token
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // setFormData({
        //   name: '',
        //   fatherName: '',
        //   dob: '',
        //   gender: '',
        //   maritalStatus: '',
        //   course: '',
        //   branch: '',
        //   enrollmentNo: '',
        //   yearOfPassing: '',
        //   mobile: '',
        //   email: '',
        //   currentAddress: '',
        //   permanentAddress: '',
        //   fieldOfWork: '',
        //   package: '',
        //   occupation: '',
        //   higherStudiesCourse: '',
        //   specialization: '',
        //   university: '',
        //   universityAddress: '',
        //   employer: '',
        //   jobDesignation: '',
        //   officePhone: '',
        //   officeEmail: '',
        //   photo: null,
        //   signature: null,
        //   rollNumber: '',
        //   batch: '',
        // });
        setErrors({});
        navigate("/dashboard/rsvp");
      } else {
        setErrors({ submit: 'Error submitting the form, please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'Error submitting the form, please try again.' });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Alumni Registration Form</h1>

        {/* Personal Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <label>Father&apos;s Name</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />

          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
          {errors.dob && <span className={styles.error}>{errors.dob}</span>}

          <label>Gender</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleChange}
              />
              Other
            </label>
            {errors.gender && <span className={styles.error}>{errors.gender}</span>}
          </div>

          <label>Marital Status</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className={styles.select}>
            <option value="">Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>

          <label>Blood Group</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={styles.select}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </section>

        {/* Academic Details Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Academic Details</h2>
          <label>Course</label>
          <select name="course" value={formData.course} onChange={handleChange} className={styles.select}>
            <option value="">Select Course</option>
            <option value="BTech">BTech</option>
            <option value="MBA">MBA</option>
            <option value="MTech">MTech</option>
            <option value="MCA">MCA</option>
          </select>

          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} className={styles.select}>
            <option value = "">Select Department</option>
            <option value = "Computer Department">Computer Department</option>
            <option value = "Civil Department">Civil Department</option>
            <option value = "Mechanical Department">Mechanical Department</option>
            <option value = "Electrical Department">Electrical Department</option>
            <option value = "Electronics and Communication Department">Electronics and Communication Department</option>
            <option value = "Science">Science</option>
            <option value = "Computer Application">Computer Application</option>
            <option value = "Humanities and Social Sciences">Humanities and Social Sciences</option>
            <option value = "School">School</option>
          </select>

          <label>Branch</label>
          <select name="branch" value={formData.branch} onChange={handleChange} className={styles.select}>
            <option value="">Select Branch</option>
            <option value="Computer Science">Computer Science and Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Production and Industrial">Production and Industrial</option>
            <option value="Electronics and Communication">Electronics and Communication</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Computer Application">Computer Application</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Humanities and Social Sciences">Humanities and Social Sciences</option>
            <option value="School of Renewable Energy and Efficiency">School of Renewable Energy and Efficiency</option>
          </select>

          <label>Enrollment No</label>
          <input type="text" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} required />

          <label>Year of Passing</label>
          <input type="text" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} required />
        </section>

        {/* Higher Studies Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Higher Studies (If applicable)</h2>
          <label>Course Name</label>
          <input type="text" name="higherStudiesCourse" value={formData.higherStudiesCourse} onChange={handleChange} />

          <label>Specialization</label>
          <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />

          <label>University</label>
          <input type="text" name="university" value={formData.university} onChange={handleChange} />

          <label>University Address</label>
          <input type="text" name="universityAddress" value={formData.universityAddress} onChange={handleChange} />
        </section>

        {/* Contact Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>
          <label>Mobile No</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
          {errors.mobile && <span className={styles.error}>{errors.mobile}</span>}

          <label>Email ID</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          <label>Current Address</label>
          <input type="text" name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />

          <label>Permanent Address</label>
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
        </section>

        {/* Professional Details Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Details</h2>
          <label>Employment Status</label>
          <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className={styles.select}>
            <option value="">Select Employment Status</option>
            <option value="Employed">Employed</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Other">Other</option>
          </select>

          {/* Conditionally render the text box if "Other" is selected */}
          {formData.employmentStatus === "Other" && (
            <div>
              <label>Please specify:</label>
              <input
                type="text"
                name="employmentStatusOther"
                value={formData.employmentStatusOther}
                onChange={handleChange}
              />
            </div>
          )}

          <label>Field of Work</label>
          <input type="text" name="fieldOfWork" value={formData.fieldOfWork} onChange={handleChange} />

          <label>Current Occupation</label>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />

          <label>Employer</label>
          <input type="text" name="employer" value={formData.employer} onChange={handleChange} />

          <label>Job Designation<sup>#</sup></label>
          <input type="text" name="jobDesignation" value={formData.jobDesignation} onChange={handleChange} />
          <p><sup>#</sup> Separate with comma for multiple designations</p>


          <label>Package</label>
          <select name="package" value={formData.package} onChange={handleChange} className={styles.select}>
            <option value="">Select Package</option>
            <option value="lessThan10L">Less than 10 lakh</option>
            <option value="10to20L">10-20 lakh</option>
            <option value="20to50L">20-50 lakh</option>
            <option value="moreThan50L">More than 50 lakh</option>
          </select>
        </section>

        {/* File Upload Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Documents Upload</h2>
          <label>Photo</label>
          <input type="file" name="photo" accept="image/jpeg" onChange={handleChange} />
          {errors.photo && <span className={styles.error}>{errors.photo}</span>}

          <label>Signature</label>
          <input type="file" name="signature" accept="image/jpeg" onChange={handleChange} />
          {errors.signature && <span className={styles.error}>{errors.signature}</span>}
        </section>

        <button type="submit" className={styles.submitButton}>Submit</button>
        {errors.submit && <span className={styles.error}>{errors.submit}</span>}
      </form>
    </div>
  );
};

export default AlumniForm;
