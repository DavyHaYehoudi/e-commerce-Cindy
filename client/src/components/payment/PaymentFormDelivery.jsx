import React from "react";
import { PiTruckThin } from "react-icons/pi";
import useFormValidation from "./hooks/useFormValidation";

const PaymentFormDelivery = ({
  validationErrors,
  validFields,
  clearValidationError,
  shippingAddress,
}) => {
  const {
    firstName = "",
    lastName = "",
    street = "",
    city = "",
    postalCode = "",
    apartment = "",
    email = "",
    phone = "",
  } = shippingAddress || {};
  const { handleShippingAndBilling } = useFormValidation();

  const handleFocus = (e) => {
    clearValidationError(e.target.name);
  };

  return (
    <>
      <div className="payment-form-heading">
        <h2>Livraison</h2>
        <PiTruckThin className="icon" aria-hidden="true" />
      </div>
      <div className="name-input-container">
        <div className="address-input-container">
          <input
            type="text"
            id="firstname"
            name="firstName"
            placeholder="Prénom *"
            required
            className={
              validationErrors.firstName
                ? "error"
                : validFields.firstName
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            aria-required="true"
            value={firstName}
            onChange={(e) =>
              handleShippingAndBilling({
                property: "shippingAddress",
                field: "firstName",
                e,
              })
            }
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Nom *"
            required
            className={
              validationErrors.lastName
                ? "error"
                : validFields.lastName
                ? "success"
                : ""
            }
            value={lastName}
            onFocus={handleFocus}
            aria-required="true"
            onChange={(e) =>
              handleShippingAndBilling({
                property: "shippingAddress",
                field: "lastName",
                e,
                section: "delivery",
              })
            }
          />
        </div>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Adresse *"
          required
          className={
            validationErrors.street
              ? "error"
              : validFields.street
              ? "success"
              : ""
          }
          onFocus={handleFocus}
          aria-required="true"
          value={street}
          onChange={(e) =>
            handleShippingAndBilling({
              property: "shippingAddress",
              field: "street",
              e,
              section: "delivery",
            })
          }
        />
        <input
          type="text"
          id="apartment"
          name="apartment"
          placeholder="Appartement"
          value={apartment}
          onChange={(e) =>
            handleShippingAndBilling({
              property: "shippingAddress",
              field: "apartment",
              e,
              section: "delivery",
            })
          }
        />
        <div className="location-details">
          <input
            type="text"
            id="postal-code"
            name="postal-code"
            placeholder="Code postal *"
            required
            value={postalCode}
            className={
              validationErrors.postalCode
                ? "error"
                : validFields.postalCode
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            aria-required="true"
            onChange={(e) =>
              handleShippingAndBilling({
                property: "shippingAddress",
                field: "postalCode",
                e,
                section: "delivery",
              })
            }
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Ville *"
            required
            value={city}
            className={
              validationErrors.city
                ? "error"
                : validFields.city
                ? "success"
                : ""
            }
            onFocus={handleFocus}
            aria-required="true"
            onChange={(e) =>
              handleShippingAndBilling({
                property: "shippingAddress",
                field: "city",
                e,
                section: "delivery",
              })
            }
          />
        </div>
      </div>
      <div>
        <input
          type="email"
          id="emailRecipient"
          name="emailRecipient"
          placeholder="Email *"
          required
          className={
            validationErrors.email
              ? "error"
              : validFields.email
              ? "success"
              : ""
          }
          onFocus={handleFocus}
          value={email}
          onChange={(e) =>
            handleShippingAndBilling({
              property: "shippingAddress",
              field: "email",
              e,
              section: "delivery",
            })
          }
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Téléphone *"
          required
          className={
            validationErrors.phone
              ? "error"
              : validFields.phone
              ? "success"
              : ""
          }
          value={phone}
          onFocus={handleFocus}
          onChange={(e) =>
            handleShippingAndBilling({
              property: "shippingAddress",
              field: "phone",
              e,
              section: "delivery",
            })
          }
        />
      </div>
    </>
  );
};

export default PaymentFormDelivery;
