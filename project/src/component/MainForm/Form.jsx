import React, { useState } from 'react';
import styles from './Form.module.css';

const AlumniForm = ({rollNumber , batch}) => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    gender: '',
    course: '',
    branch: '',
    enrollmentNo: '',
    yearOfPassing: '',
    maritalStatus: '',
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
    rollNumber : rollNumber ,
    batch : batch
  });

  const [errors, setErrors] = useState({}); // To store validation errors

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Simple validation checks
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required.';
    if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    // Add more validations as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate the form

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http:://localhost:8080/api/v1/alumni', {
        method: 'POST',
        body: data,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Reset the form after successful submission
      setFormData({
        name: '',
        fatherName: '',
        dob: '',
        gender: '',
        course: '',
        branch: '',
        enrollmentNo: '',
        yearOfPassing: '',
        maritalStatus: '',
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
      });
      
      setErrors({}); // Clear errors on successful submission

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

          <label>Father's Name</label>
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

          <label>Branch</label>
          <select name="branch" value={formData.branch} onChange={handleChange} className={styles.select}>
            <option value="">Select Branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
            <option value="Production and Industrial">Production and Industrial</option>
            <option value="Electronics and Communication">Electronics and Communication</option>
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
          <label>Field of Work</label>
          <input type="text" name="fieldOfWork" value={formData.fieldOfWork} onChange={handleChange} />

          <label>Current Occupation</label>
          <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />

          <label>Employer</label>
          <input type="text" name="employer" value={formData.employer} onChange={handleChange} />

          <label>Job Designation</label>
          <input type="text" name="jobDesignation" value={formData.jobDesignation} onChange={handleChange} />

          <label>Office Phone</label>
          <input type="tel" name="officePhone" value={formData.officePhone} onChange={handleChange} />

          <label>Office Email</label>
          <input type="email" name="officeEmail" value={formData.officeEmail} onChange={handleChange} />
        </section>

        {/* File Upload Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Documents Upload</h2>
          <label>Photo</label>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />

          <label>Signature</label>
          <input type="file" name="signature" accept="image/*" onChange={handleChange} />
        </section>

        <button type="submit" className={styles.submitButton}>Submit</button>
        {errors.submit && <span className={styles.error}>{errors.submit}</span>}
      </form>
    </div>
  );
};

export default AlumniForm;
