import React from "react";
import { CiMail } from "react-icons/ci";

const PaymentFormContact = ({ onUpdate }) => {

  const handleChange = (e) => {
    onUpdate({ [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="payment-form-heading">
        <h2>Contact</h2>
        <CiMail className="icon" aria-hidden="true" />
      </div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Adresse e-mail *"
        required
        onChange={handleChange}
      />
    </>
  );
};

export default PaymentFormContact;
