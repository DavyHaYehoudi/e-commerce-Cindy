import React from "react";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormCard from "./PaymentFormCard";
import PaymentFormBilling from "./PaymentFormBilling";
import Advantages from "./Advantages";
import useFormValidation from "./hooks/useFormValidation";

const PaymentForm = () => {
  const {
    formData,
    validationErrors,
    updateData,
    handleCheckboxChange,
    handleSubmit,
    clearValidationError,
  } = useFormValidation();

  const requiredDeliveryFields = [
    "firstname",
    "lastname",
    "address",
    "postal-code",
    "city",
    "emailRecipient",
    "phone",
    "card-number",
    "expiration-date",
    "security-code",
    "card-name",
  ];

  return (
    <div id="payment-form" data-testid="payment-form">
      <p className="asterix">
        Les champs marqués par une étoile * sont obligatoires.
      </p>
      <PaymentFormDelivery
        onUpdate={(data) => updateData("delivery", data)}
        validationErrors={validationErrors}
        clearValidationError={clearValidationError}
      />
      <Advantages />
      <PaymentFormCard
        onUpdate={(data) => updateData("card", data)}
        validationErrors={validationErrors}
        clearValidationError={clearValidationError}
      />
      <PaymentFormBilling onUpdate={(data) => updateData("billing", data)} />
      <div className="checkbox">
        <input
          id="remember-me"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="remember-me">
          Enregistrer ces informations pour les prochaines commandes.
        </label>
      </div>
      <button
        className="payment-button"
        type="button"
        onClick={() => handleSubmit(requiredDeliveryFields)}
      >
        Procéder au paiement
      </button>
    </div>
  );
};

export default PaymentForm;
