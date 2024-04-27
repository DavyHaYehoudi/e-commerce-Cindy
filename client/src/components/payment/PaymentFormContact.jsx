import React, { useState } from "react";
import { CiMail } from "react-icons/ci";

const PaymentFormContact = ({ onUpdate }) => {
  const [subscribe, setSubscribe] = useState(false);

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
        placeholder="Adresse e-mail *"
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
      <div className="subscribe">
        <label htmlFor="subscribe">
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            checked={subscribe}
            onChange={() => setSubscribe(!subscribe)}
          />
          Envoyez-moi les nouvelles et les offres par e-mail
        </label>
      </div>
    </>
  );
};

export default PaymentFormContact;
