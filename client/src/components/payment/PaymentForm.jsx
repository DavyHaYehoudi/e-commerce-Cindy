import React, { useState } from "react";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormCard from "./PaymentFormCard";
import PaymentFormBilling from "./PaymentFormBilling";
import axios from "axios";
import Avantages from "./Avantages";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    delivery: {},
    card: {},
    billing: {},
    saveInfo: true, 
  });

  const updateDeliveryData = (data) => {
    setFormData((prevData) => ({ ...prevData, delivery: data }));
  };

  const updateCardData = (data) => {
    setFormData((prevData) => ({ ...prevData, card: data }));
  };

  const updateBillingData = (data) => {
    setFormData((prevData) => ({ ...prevData, billing: data }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({ ...prevData, saveInfo: !prevData.saveInfo }));
  };

  const handleSubmit = () => {
    axios.post("/endpoint", formData)
      .then((response) => {
      })
      .catch((error) => {
      });
  };

  return (
    <div id="payment-form" data-testid="payment-form">
      <p className="asterix">Les champs marqués par une étoile * sont obligatoires.</p>
      <PaymentFormDelivery onUpdate={updateDeliveryData} />
      <Avantages />
      <PaymentFormCard onUpdate={updateCardData} />
      <PaymentFormBilling onUpdate={updateBillingData} />
      <div className="checkbox">

        <input
          type="checkbox"
          checked={formData.saveInfo}
          onChange={handleCheckboxChange}
        />
      <label>
        Enregistrer ces informations pour les prochaines commandes.
      </label>
      </div>
      <button className="payment-button" type="button" onClick={handleSubmit}>
        Procéder au paiement
      </button>
    </div>
  );
};

export default PaymentForm;
