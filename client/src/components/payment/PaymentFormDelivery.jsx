import React, { useState } from "react";
import { PiTruckThin } from "react-icons/pi";

const PaymentFormDelivery = ({
  onUpdate,
  validationErrors,
  clearValidationError,
}) => {
  const [selectedValue, setSelectedValue] = useState("france");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };
  const handleFocus = (e) => {
    clearValidationError(e.target.name);
  };
  return (
    <>
      <div className="payment-form-heading">
        <h2>Livraison</h2>
        <PiTruckThin className="icon" aria-hidden="true" />
      </div>
      <select
        id="country"
        name="country"
        placeholder="Pays/région"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option defaultValue="france">France</option>
        <option value="belgium">Belgique</option>
        <option value="switzerland">Suisse</option>
        <option value="germany">Allemagne</option>
        <option value="spain">Espagne</option>
        <option value="italy">Italie</option>
        <option value="united-kingdom">Royaume-Uni</option>
        <option value="netherlands">Pays-Bas</option>
        <option value="portugal">Portugal</option>
        <option value="luxembourg">Luxembourg</option>
      </select>
      <div className="name-input-container">
        <div className="address-input-container">
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Prénom *"
            required
            className={validationErrors.firstname ? "error" : ""}
            onFocus={handleFocus}
            aria-required="true"
            onChange={handleChange}
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Nom *"
            required
            className={validationErrors.lastname ? "error" : ""}
            onFocus={handleFocus}
            aria-required="true"
            onChange={handleChange}
          />
        </div>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Adresse *"
          required
          className={validationErrors.address ? "error" : ""}
          onFocus={handleFocus}
          aria-required="true"
          onChange={handleChange}
        />
        <input
          type="text"
          id="apartment"
          name="apartment"
          placeholder="Appartement"
          onChange={handleChange}
        />
        <div className="location-details">
          <input
            type="text"
            id="postal-code"
            name="postal-code"
            placeholder="Code postal *"
            required
            className={validationErrors["postal-code"] ? "error" : ""}
            onFocus={handleFocus}
            aria-required="true"
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Ville *"
            required
            className={validationErrors.city ? "error" : ""}
            onFocus={handleFocus}
            aria-required="true"
            onChange={handleChange}
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
          className={validationErrors.emailRecipient ? "error" : ""}
          onFocus={handleFocus}
          onChange={handleChange}
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Téléphone *"
          required
          className={validationErrors.phone ? "error" : ""}
          onFocus={handleFocus}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default PaymentFormDelivery;
