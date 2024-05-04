import React, { useState } from "react";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormCard from "./PaymentFormCard";
import PaymentFormBilling from "./PaymentFormBilling";
import axios from "axios";

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
      <button type="button" onClick={handleSubmit}>
        Vérifier la commande
      </button>
    </div>
  );
};

export default PaymentForm;
