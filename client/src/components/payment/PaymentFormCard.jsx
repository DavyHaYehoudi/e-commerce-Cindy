import React from "react";
import { CiMoneyCheck1 } from "react-icons/ci";
import paymentCard from "../../assets/paymentCard.png";

const PaymentFormCard = () => {
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
      />
      <input
        type="text"
        id="expiration-date"
        name="expiration-date"
        placeholder="Date d'expiration * (MM/AA)"
        required
      />
      <input
        type="text"
        id="security-code"
        name="security-code"
        placeholder="Code de sécurité * (les 3 chiffres au dos)"
        required
      />
      <input
        type="text"
        id="card-name"
        name="card-name"
        placeholder="Nom sur la carte *"
        required
      />
    </>
  );
};

export default PaymentFormCard;
