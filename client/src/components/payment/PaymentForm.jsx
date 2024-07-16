import React from "react";
import PaymentFormDelivery from "./PaymentFormDelivery";
import PaymentFormBilling from "./PaymentFormBilling";
import useFormValidation from "./hooks/useFormValidation";
import { ToastContainer } from "react-toastify";

const PaymentForm = () => {
  const {
    isRememberMe,
    shippingAddress,
    billingAddress,
    validationErrors,
    validFields,
    handleToggleRememberMe,
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
      <PaymentFormBilling
        validationErrors={validationErrors.billing || {}}
        validFields={validFields.billing || {}}
        clearValidationError={(field) => clearValidationError("billing", field)}
        billingAddress={billingAddress}
      />
      <div className="checkbox">
        <input
          id="remember-me"
          type="checkbox"
          checked={isRememberMe}
          onChange={handleToggleRememberMe}
        />
        <label htmlFor="remember-me">
          Enregistrer ces informations pour les prochaines commandes.
        </label>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default PaymentForm;
