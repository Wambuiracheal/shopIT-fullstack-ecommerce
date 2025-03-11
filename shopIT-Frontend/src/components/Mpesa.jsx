import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MpesaPayment() {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const initialAmount = orderData ? orderData.totalAmount : "";

  const [phone, setPhone] = useState("254");
  const [amount] = useState(initialAmount);
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    if (!input.startsWith("254")) {
      input = "254";
    } else if (input.length > 12) {
      input = input.slice(0, 12);
    }
    setPhone(input);
  };

  const handlePay = (e) => {
    e.preventDefault();

    if (!phone || phone.length !== 12 || !amount) {
      alert("Please enter a valid phone number and amount.");
      return;
    }

    setLoading(true);

    axios
      .post(
        "http://127.0.0.1:5000/mpesa/pay",
        { phone_number: phone, amount: amount },
        { headers: { "Content-Type": "application/json", Accept: "application/json" } }
      )
      .then((response) => {
        console.log("Payment Response:", response.data);
        alert("Payment successful! Check your phone for confirmation.");
      })
      .catch((error) => {
        console.error("Payment Error:", error);
        if (error.response) {
          alert(`Error: ${error.response.data.error || "Payment failed!"}`);
        } else {
          alert("Payment failed! Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <style>
        {`
          .container {
            max-width: 600px; /* Increased width */
            margin: 50px auto;
            padding: 30px;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
            text-align: center;
            font-family: Arial, sans-serif;
          }

          .title {
            color: #ff6600;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 15px;
          }

          .subtitle {
            font-size: 20px;
            color: #444;
            margin-bottom: 25px;
          }

          .mpesa-text {
            color: #34a853;
            font-weight: bold;
            font-size: 24px;
          }

          .hyphen {
            color: black;
          }

          .payment-form {
            display: flex;
            flex-direction: column;
            gap: 20px; /* Increased spacing */
          }

          .input-field {
            width: 100%;
            padding: 15px;
            font-size: 18px;
            border: 2px solid #ddd;
            border-radius: 8px;
          }

          .input-field:disabled {
            background: #f5f5f5;
          }

          .pay-button {
            background: #ff6600;
            color: white;
            border: none;
            padding: 15px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 8px;
            transition: background 0.3s ease-in-out;
          }

          .pay-button:hover {
            background: #cc5500;
          }

          .pay-button:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        `}
      </style>

      <h2 className="title">shopIT</h2>
      <p className="subtitle">
        Pay with <span className="mpesa-text">M<span className="hyphen">-</span>pesa</span>
      </p>

      <form className="payment-form" onSubmit={handlePay}>
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          className="input-field"
          placeholder="2547XXXXXXXX"
          required
        />

        <input
          type="number"
          value={amount}
          className="input-field"
          placeholder="Amount"
          disabled
          required
        />

        <button type="submit" className="pay-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default MpesaPayment;
