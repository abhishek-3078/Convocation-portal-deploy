import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import styles from './Form.module.css';

const Form = () => {
  const [Name, setName] = useState('');
  const [FatherName, setFatherName] = useState('');
  const [DateOfBirth , setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Name || !FatherName) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      let response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, FatherName }),
      });

      if (response.ok) {
        response = await response.json();
        if (response.success) {
          setAuth({ ...auth, token: response.token, role: response.role });
          localStorage.setItem('auth', JSON.stringify({ token: response.token, role: response.role }));
          navigate('/dashboard/main');
        } else {
          toast.error('You are not registered');
        }
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = 'http://localhost:8080/api/v1/auth/google';
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Alumni form</h1>
        <p className={styles.subtitle}>Welcome back! Please enter your details.</p>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Name</label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
            placeholder="Name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Date of birth</label>
          <input
            type="date"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fathername" className={styles.label}>Father's Name</label>
          <input
            type="text"
            value={FatherName}
            onChange={(e) => setFatherName(e.target.value)}
            required
            className={styles.input}
            placeholder="Father's name"
            disabled={loading}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.buttonPrimary} ${loading ? styles.disabled : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submiting...' : 'Submit'}
          </button>
          
        </div>
      </div>
    </Layout>
  );
};

export default Form;
