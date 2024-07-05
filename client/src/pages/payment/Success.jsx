import React from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const Success = () => {
  return (
    <div className="payment-success-page">
      <div className="success-page-container">
        <span>
          {" "}
          <IoShieldCheckmarkSharp size={100} />{" "}
        </span>
        <p>
          Payment bien effectué.
          <br />
          Nous allons gérer votre commande.
          <br />
          Retrouvez les détails dans votre espace client.
        </p>
      </div>
    </div>
  );
};

export default Success;
