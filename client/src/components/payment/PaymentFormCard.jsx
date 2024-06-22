import React from "react";
import { CiMoneyCheck1 } from "react-icons/ci";
import paymentCard from "../../assets/paymentCard.png";

const PaymentFormCard = ({
  onUpdate,
  validationErrors,
  validFields,
  clearValidationError,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };
  const handleFocus = (e) => {
    clearValidationError(e.target.name);
  };
  return (
    <>
      <div className="payment-form-heading">
        <h2>Paiement</h2>
        <CiMoneyCheck1 className="icon" aria-hidden="true" />
      </div>
      <p>Toutes les transactions sont sécurisées et chiffrées.</p>
      <div className="credit-cards">
        <img src={paymentCard} alt="" />
      </div>
      <input
        type="text"
        id="card-number"
        name="card-number"
        placeholder="Numéro de carte *"
        required
        className={validationErrors["card-number"] ? "error" : validFields["card-number"] ? "success" : ""}

        onFocus={handleFocus}
        onChange={handleChange}
      />
      <input
        type="text"
        id="expiration-date"
        name="expiration-date"
        placeholder="Date d'expiration * (MM/AA)"
        required
        className={validationErrors["expiration-date"] ? "error" : validFields["expiration-date"] ? "success" : ""}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <input
        type="text"
        id="security-code"
        name="security-code"
        placeholder="Code de sécurité * (les 3 chiffres au dos)"
        required
        className={validationErrors["security-code"] ? "error" : validFields["security-code"] ? "success" : ""}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      <input
        type="text"
        id="card-name"
        name="card-name"
        placeholder="Nom sur la carte *"
        required
        className={validationErrors["card-name"] ? "error" : validFields["card-name"] ? "success" : ""}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    </>
  );
};

export default PaymentFormCard;
