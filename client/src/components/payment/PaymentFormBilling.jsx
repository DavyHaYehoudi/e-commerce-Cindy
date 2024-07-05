import React from "react";
import useFormValidation from "./hooks/useFormValidation";

const PaymentFormBilling = ({
  validationErrors,
  validFields,
  clearValidationError,
  billingAddress,
}) => {
  const {
    companyName="",
    firstName="",
    lastName="",
    street="",
    city="",
    postalCode="",
    apartment="",
    email="",
    phone="",
  } = billingAddress || {};
  const {
    handleShippingAndBilling,
    isBillingSameAddress,
    handleToggleBillingCheck,
  } = useFormValidation();
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
          checked={isBillingSameAddress}
          onChange={() => handleToggleBillingCheck("isBillingSameAddress")}
        />
        <label htmlFor="useShippingAddress">
          Utiliser l'adresse de livraison comme adresse de facturation.
        </label>
      </div>

      {!isBillingSameAddress && (
        <div className="billing-fields">
          <input
            type="text"
            id="billingCompany"
            name="billingCompany"
            placeholder="Nom de la société ou raison sociale"
            value={companyName}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "companyName",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingFirstName"
            name="billingFirstName"
            placeholder="Prénom *"
            required
            aria-required="true"
            className={
              validationErrors.firstName
                ? "error"
                : validFields.firstName
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            value={firstName}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "firstName",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingLastName"
            name="billingLastName"
            placeholder="Nom *"
            required
            aria-required="true"
            className={
              validationErrors.lastName
                ? "error"
                : validFields.lastName
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            value={lastName}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "lastName",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            placeholder="Adresse *"
            required
            aria-required="true"
            className={
              validationErrors.street
                ? "error"
                : validFields.street
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            value={street}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "street",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingApartment"
            name="billingApartment"
            placeholder="Appartement"
            onFocus={handleFocus}
            value={apartment}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "apartment",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingPostalCode"
            name="billingPostalCode"
            placeholder="Code postal *"
            required
            aria-required="true"
            className={
              validationErrors.postalCode
                ? "error"
                : validFields.postalCode
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            value={postalCode}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "postalCode",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingCity"
            name="billingCity"
            placeholder="Ville *"
            required
            aria-required="true"
            className={
              validationErrors.city
                ? "error"
                : validFields.city
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            value={city}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "city",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="email"
            id="billingEmail"
            name="billingEmail"
            placeholder="Email *"
            required
            aria-required="true"
            className={
              validationErrors.email
                ? "error"
                : validFields.email
                ? "success"
                : ""
            }
            value={email}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "email",
                e,
                section: "billing",
              })
            }
          />
          <input
            type="text"
            id="billingPhone"
            name="billingPhone"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "billingAddress",
                field: "phone",
                e,
                section: "billing",
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PaymentFormBilling;
