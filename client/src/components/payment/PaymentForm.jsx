import React from "react";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormCard from "./PaymentFormCard";
import PaymentFormBilling from "./PaymentFormBilling";
import Advantages from "./Advantages";
import useFormValidation from "./hooks/useFormValidation";
import { ToastContainer } from "react-toastify";
import { formatPrice } from "../../helpers/utils/prices";
import InventoryAdvantages from "./InventoryAdvantages";

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
const PaymentForm = ({cartAmount}) => {
  const {
    formData,
    shippingAddress,
    billingAddress,
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
        validationErrors={validationErrors.delivery || {}}
        validFields={validFields.delivery || {}}
        clearValidationError={(field) =>
          clearValidationError("delivery", field)
        }
        shippingAddress={shippingAddress}
      />
      <Advantages />
      <PaymentFormCard
        onUpdate={(data) => updateData("card", data)}
        validationErrors={validationErrors.card || {}}
        validFields={validFields.card || {}}
        clearValidationError={(field) => clearValidationError("card", field)}
      />
      <PaymentFormBilling
        validationErrors={validationErrors.billing || {}}
        validFields={validFields.billing || {}}
        clearValidationError={(field) => clearValidationError("billing", field)}
        handleCheckboxChange={handleCheckboxChange}
        formData={formData}
        billingAddress={billingAddress}
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
      <InventoryAdvantages />
      <button
        className="payment-button"
        type="button"
        onClick={() => handleSubmit(requiredFields)}
      >
        Procéder au paiement : {formatPrice(cartAmount) }
      </button>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default PaymentForm;
