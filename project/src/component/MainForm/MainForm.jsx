import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import styles from './MainForm.module.css';
import RESULT from './Result';

const MainForm = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result , setResult] = useState(false);
  const navigate = useNavigate();
  const {batch} = useLocation()?.state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rollNumber) {
      toast.error("Please enter your roll number first before verifying");
      return;
    }
    var newbatch = parseInt(batch);
    var year = parseInt(rollNumber[1] + rollNumber[2]) + 2000
    console.log(year," : ",newbatch)

    setLoading(true);
    try {
      if (rollNumber.length > 2 && (year === newbatch)){
        setResult(true);
      }
      else {
        toast.error("Wrong number or batch year");
      }
    } catch (err) {
      alert(';sdcsdv')
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    {!result && <div className={styles.container}>
    <h1 className={styles.title}>Verification</h1>
    <p className={styles.subtitle}>Please verify your roll number</p>
    <div className={styles.inputGroup}>
        <label className={styles.label}>Roll Number</label>
        <input
        type="text"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        required
        className={styles.input}
        placeholder="Enter your Roll Number"
        disabled={loading}
        />
    </div>
    <div className={styles.buttonGroup}>
        <button
        className={`${styles.button} ${loading ? styles.buttonDisabled : ''}`}
        onClick={handleSubmit}
        disabled={loading}
        >
        {loading ? 'Verifying...' : 'Verify'}
        </button>
    </div>
    </div>}

    {
        result && <RESULT batch={batch} rollNumber={rollNumber}/>
    }
    </Layout>
  );
};

export default MainForm;
