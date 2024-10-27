import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../const';
import { useAuth } from '../context/auth';

const PaymentProof = () => {
  const [transactionId, setTransactionId] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();

  const handleReceiptUpload = (e) => {
    setReceipt(e.target.files[0]); // Capture the uploaded file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transactionId && receipt) {
      // Create a FormData object to handle the file and transaction ID
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("receipt", receipt);
      
      try {
        const response = await fetch(`${API}/api/v1/alumni/receipt?folder=receipt`, {
          method: "POST",
          headers: {
            "Authorization": auth?.token
          },
          body: formData
        });
  
        if (response.ok) {
          console.log("Transaction ID:", transactionId);
          console.log("Uploaded Receipt:", receipt);
          // navigate("/dashboard");
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Please provide both the transaction ID and receipt.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Convocation Payment Confirmation
        </h1>

        <p className="text-gray-600 text-center mb-8">
          For payment of registration fees, click the button below.
        </p>

        <div className="flex justify-center mb-8">
          <a
            href="https://www.onlinesbi.sbi/sbicollect/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            Go to SBI Collect
          </a>
        </div>

        <p className="text-gray-600 text-center mb-4">
          If you have already made the payment, please fill in the details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="transactionId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Transaction ID"
              required
            />
          </div>

          <div>
            <label
              htmlFor="receiptUpload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Payment Receipt
            </label>
            <input
              type="file"
              id="receiptUpload"
              accept="application/pdf"
              onChange={handleReceiptUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentProof;