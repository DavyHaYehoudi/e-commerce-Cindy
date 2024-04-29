import React from "react";
import { CiMail } from "react-icons/ci";

const PaymentFormContact = ({ onUpdate }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    onUpdate({ [name]: inputValue });
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
        placeholder="Adresse e-mail"
        required
        aria-required="true"
        onChange={handleChange}
      />
      <input
        type="text"
        id="phoneContact"
        name="phoneContact"
        placeholder="Téléphone"
        aria-required="true"
        onChange={handleChange}
      />
    </>
  );
};

export default PaymentFormContact;
