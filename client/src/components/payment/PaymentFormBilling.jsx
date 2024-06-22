import React from "react";

const PaymentFormBilling = ({
  onUpdate,
  validationErrors,
  validFields,
  clearValidationError,
  handleCheckboxChange,
  formData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };
  const handleFocus = (e) => {
    clearValidationError(e.target.name);
  };

  return (
    <div>
      <div className="checkbox">
        <input
          type="checkbox"
          id="useShippingAddress"
          name="useShippingAddress"
          checked={formData.isBillingSameAddress}
          onChange={() => handleCheckboxChange("isBillingSameAddress")}
        />
        <label htmlFor="useShippingAddress">
          Utiliser l'adresse de livraison comme adresse de facturation.
        </label>
      </div>

      {!formData.isBillingSameAddress && (
        <div className="billing-fields">
          <input
            type="text"
            id="billingCompany"
            name="billingCompany"
            placeholder="Nom de la société ou raison sociale"
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingFirstName"
            name="billingFirstName"
            placeholder="Prénom *"
            required
            aria-required="true"
            className={
              validationErrors.billingFirstName
                ? "error"
                : validFields.billingFirstName
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingLastName"
            name="billingLastName"
            placeholder="Nom *"
            required
            aria-required="true"
            className={
              validationErrors.billingLastName
                ? "error"
                : validFields.billingLastName
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            placeholder="Adresse *"
            required
            aria-required="true"
            className={
              validationErrors.billingAddress
                ? "error"
                : validFields.billingAddress
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingApartment"
            name="billingApartment"
            placeholder="Appartement"
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingPostalCode"
            name="billingPostalCode"
            placeholder="Code postal *"
            required
            aria-required="true"
            className={
              validationErrors.billingPostalCode
                ? "error"
                : validFields.billingPostalCode
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingCity"
            name="billingCity"
            placeholder="Ville *"
            required
            aria-required="true"
            className={
              validationErrors.billingCity
                ? "error"
                : validFields.billingCity
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            onChange={handleChange}
          />
          <input
            type="email"
            id="billingEmail"
            name="billingEmail"
            placeholder="Email *"
            required
            aria-required="true"
            className={
              validationErrors.billingEmail
                ? "error"
                : validFields.billingEmail
                ? "success"
                : ""
            }
            onChange={handleChange}
          />
          <input
            type="text"
            id="billingPhone"
            name="billingPhone"
            placeholder="Téléphone"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentFormBilling;
