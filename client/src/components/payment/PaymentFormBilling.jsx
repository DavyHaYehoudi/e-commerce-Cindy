import React, { useState } from "react";

const PaymentFormBilling = ({ onUpdate }) => {
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [billingData, setBillingData] = useState({
    billingFirstName: "",
    billingLastName: "",
    billingCompany: "",
    billingAddress: "",
    billingApartment: "",
    billingPostalCode: "",
    billingCity: "",
  });

  const handleChange = () => {
    setUseShippingAddress(!useShippingAddress);
    onUpdate({
      useShippingAddress: !useShippingAddress,
      ...billingData,
    });
  };

  const handleBillingChange = (field, value) => {
    setBillingData((prevData) => ({ ...prevData, [field]: value }));
    onUpdate({
      ...billingData,
      [field]: value,
    });
  };

  return (
    <div>
      <div className="checkbox">
        <input
          type="checkbox"
          id="useShippingAddress"
          name="useShippingAddress"
          checked={useShippingAddress}
          onChange={handleChange}
        />
        <label htmlFor="useShippingAddress">
          Utiliser l'adresse de livraison comme adresse de facturation.
        </label>
      </div>

      {!useShippingAddress && (
        <div className="billing-fields">
          <input
            type="text"
            id="billingCompany"
            name="billingCompany"
            placeholder="Nom de la société ou raison sociale"
            onChange={(e) =>
              handleBillingChange("billingCompany", e.target.value)
            }
          />
          <input
            type="text"
            id="billingFirstName"
            name="billingFirstName"
            placeholder="Prénom *"
            required
            aria-required="true"
            onChange={(e) =>
              handleBillingChange("billingFirstName", e.target.value)
            }
          />
          <input
            type="text"
            id="billingLastName"
            name="billingLastName"
            placeholder="Nom *"
            required
            aria-required="true"
            onChange={(e) =>
              handleBillingChange("billingLastName", e.target.value)
            }
          />
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            placeholder="Adresse *"
            required
            aria-required="true"
            onChange={(e) =>
              handleBillingChange("billingAddress", e.target.value)
            }
          />
          <input
            type="text"
            id="billingApartment"
            name="billingApartment"
            placeholder="Appartement"
            onChange={(e) =>
              handleBillingChange("billingApartment", e.target.value)
            }
          />
          <input
            type="text"
            id="billingPostalCode"
            name="billingPostalCode"
            placeholder="Code postal *"
            required
            aria-required="true"
            onChange={(e) =>
              handleBillingChange("billingPostalCode", e.target.value)
            }
          />
          <input
            type="text"
            id="billingCity"
            name="billingCity"
            placeholder="Ville *"
            required
            aria-required="true"
            onChange={(e) => handleBillingChange("billingCity", e.target.value)}
          />
          <input
            type="email"
            id="emailBill"
            name="emailBill"
            placeholder="Email *"
          />
          <input
            type="text"
            id="phoneBill"
            name="phoneBill"
            placeholder="Téléphone"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentFormBilling;
