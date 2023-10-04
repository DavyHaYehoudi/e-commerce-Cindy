import React, { useState } from "react";
import { CiMail } from "react-icons/ci";

const PaymentFormContact = ({ onUpdate }) => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  const handleChange = (e) => {
    onUpdate({ [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="payment-form-heading">
        <h2>Contact</h2>
        <CiMail className="icon" />
      </div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Adresse e-mail *"
        required
        onChange={handleChange}
      />
      <div className="checkbox">
        <input
          type="checkbox"
          id="subscribe"
          name="subscribe"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="subscribe">
          Envoyez-moi les nouvelles et les offres par e-mail
        </label>
      </div>
    </>
  );
};

export default PaymentFormContact;
