import React, { useState } from "react";
import { PiTruckThin } from "react-icons/pi";

const PaymentFormDelivery = ({ onUpdate }) => {
  const [selectedValue, setSelectedValue] = useState("france");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChange = (e) => {
    onUpdate({ [e.target.name]: e.target.value });
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
            aria-required="true"
            onChange={handleChange}
          />
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Nom *"
            required
            aria-required="true"
          />
        </div>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Adresse *"
          required
          aria-required="true"
          onChange={handleChange}
        />
        <input
          type="text"
          id="apartment"
          name="apartment"
          placeholder="Appartement (optionnel)"
          onChange={handleChange}
        />
        <div className="location-details">
          <input
            type="text"
            id="postal-code"
            name="postal-code"
            placeholder="Code postal *"
            required
            aria-required="true"
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Ville *"
            required
            aria-required="true"
            onChange={handleChange}
          />
        </div>
      </div>
      <div
        className="info-tooltip"
        aria-label="Uniquement pour vous joindre éventuellement dans le cadre de votre commande"
      >
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Téléphone (optionnel)"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default PaymentFormDelivery;
