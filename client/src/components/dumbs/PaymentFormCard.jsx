import React from "react";
import { CiMoneyCheck1 } from "react-icons/ci";
import paymentCard from "../../assets/paymentCard.png";

const PaymentFormCard = ({onUpdate} ) => {
    const handleChange = (e) => {
        onUpdate({ [e.target.name]: e.target.value });
      };
  return (
    <>
      <div className="payment-form-heading">
        <h2>Paiement</h2>
        <CiMoneyCheck1 className="icon"/>
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
        onChange={handleChange}
      />
      <input
        type="text"
        id="expiration-date"
        name="expiration-date"
        placeholder="Date d'expiration * (MM/AA)"
        onChange={handleChange}
      />
      <input
        type="text"
        id="security-code"
        name="security-code"
        placeholder="Code de sécurité * (les 3 chiffres au dos)"
        onChange={handleChange}
      />
      <input
        type="text"
        id="card-name"
        name="card-name"
        placeholder="Nom sur la carte *"
        onChange={handleChange}
      />
    </>
  );
};

export default PaymentFormCard;
