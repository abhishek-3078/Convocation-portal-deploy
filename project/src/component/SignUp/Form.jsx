import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      let response = await fetch(`https://convocation-portal-2.onrender.com/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        response = await response.json();
        if (response.success) {
          setAuth({ ...auth, token: response.token });
          localStorage.setItem('auth', JSON.stringify({ token: response.token }));
          navigate('/');
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    window.location.href = 'https://convocation-portal-2.onrender.com/api/v1/auth/google';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-center text-navy-800">
        19th Convocation Registration
      </h1>
      <p className="text-gray-600 text-center mt-2 mb-6">
        Sign up to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md bg-[#C21717] text-white font-semibold hover:bg-[#C21720] transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 mt-4 hover:bg-gray-100 transition-all"
          disabled={loading}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            className="text-[#C21717] font-medium hover:underline"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Form;
