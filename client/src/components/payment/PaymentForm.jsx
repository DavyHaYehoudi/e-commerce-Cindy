import React from "react";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormCard from "./PaymentFormCard";
import PaymentFormBilling from "./PaymentFormBilling";
import Advantages from "./Advantages";
import useFormValidation from "./hooks/useFormValidation";
import { ToastContainer } from "react-toastify";

const requiredFields = {
  delivery: [
    "firstname",
    "lastname",
    "address",
    "postal-code",
    "city",
    "emailRecipient",
    "phone",
  ],
  card: ["card-number", "expiration-date", "security-code", "card-name"],
  billing: [
    "billingFirstName",
    "billingLastName",
    "billingAddress",
    "billingPostalCode",
    "billingCity",
    "billingEmail"
  ],
};
const PaymentForm = () => {
  const {
    formData,
    validationErrors,
    validFields,
    updateData,
    handleCheckboxChange,
    handleSubmit,
    clearValidationError,
  } = useFormValidation();


  return (
    <div id="payment-form" data-testid="payment-form">
      <p className="asterix">
        Les champs marqués par une étoile * sont obligatoires.
      </p>
      <PaymentFormDelivery
        onUpdate={(data) => updateData("delivery", data)}
        validationErrors={validationErrors.delivery || {}}
        validFields={validFields.delivery || {}}
        clearValidationError={(field) =>
          clearValidationError("delivery", field)
        }
      />
      <Advantages />
      <PaymentFormCard
        onUpdate={(data) => updateData("card", data)}
        validationErrors={validationErrors.card || {}}
        validFields={validFields.card || {}}
        clearValidationError={(field) => clearValidationError("card", field)}
      />
      <PaymentFormBilling
        onUpdate={(data) => updateData("billing", data)}
        validationErrors={validationErrors.billing || {}}
        validFields={validFields.billing || {}}
        clearValidationError={(field) => clearValidationError("billing", field)}
        handleCheckboxChange={handleCheckboxChange}
        formData={formData}
      />
      <div className="checkbox">
        <input
          id="remember-me"
          type="checkbox"
          checked={formData.rememberMe}
          onChange={()=> handleCheckboxChange('rememberMe')}
        />
        <label htmlFor="remember-me">
          Enregistrer ces informations pour les prochaines commandes.
        </label>
      </div>
      <button
        className="payment-button"
        type="button"
        onClick={() => handleSubmit(requiredFields)}
      >
        Procéder au paiement
      </button>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default PaymentForm;
