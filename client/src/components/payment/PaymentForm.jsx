import React, { useState } from "react";
import PaymentFormContact from "./PaymentFormContact";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormCard from "./PaymentFormCard";
import PaymentFormBilling from "./PaymentFormBilling";
import axios from "axios";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    contact: {},
    delivery: {},
    card: {},
    billing: {},
  });

  const updateContactData = (data) => {
    setFormData((prevData) => ({ ...prevData, contact: data }));
  };

  const updateDeliveryData = (data) => {
    setFormData((prevData) => ({ ...prevData, delivery: data }));
  };

  const updateCardData = (data) => {
    setFormData((prevData) => ({ ...prevData, card: data }));
  };

  const updateBillingData = (data) => {
    setFormData((prevData) => ({ ...prevData, billing: data }));
  };

  const handleSubmit = () => {
    axios.post("/endpoint", formData)
      .then((response) => {
      })
      .catch((error) => {
      });
  };
  

  return (
    <div id="payment-form">
      <PaymentFormContact onUpdate={updateContactData} />
      <PaymentFormDelivery onUpdate={updateDeliveryData} />
      <PaymentFormCard onUpdate={updateCardData} />
      <PaymentFormBilling onUpdate={updateBillingData} />
      <button type="button" onClick={handleSubmit}>
        Vérifier la commande
      </button>
    </div>
  );
};

export default PaymentForm;
