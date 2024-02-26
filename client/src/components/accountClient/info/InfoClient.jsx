import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateClientField } from "../../../features/accountClient/customerSlice";

const InfoClient = ({
  dataClient,
  handleChangeProfilSave,
  isEditing,
  handleChangeProfilEdit,
  clientId,
  setIsModified,
}) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setIsValidEmail(emailRegex.test(value));
    }
    dispatch(updateClientField({ clientId, field: name, value }));
    setIsModified(true);
  };

  return (
    <div className="user-info-account">
      <h2>Informations</h2>
      <p>
        <b>
          <span className="dotted">Prénom</span> :
        </b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="firstName"
            className="account-input"
            value={dataClient?.firstName}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.firstName
        )}
      </p>
      <p>
        <b>
          <span className="dotted">Nom</span> :{" "}
        </b>
        {isEditing ? (
          <input
            type="text"
            name="lastName"
            className="account-input"
            value={dataClient?.lastName}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.lastName
        )}
      </p>
      <p>
        <b>
          <span className="dotted">Email</span> :
        </b>{" "}
        {isEditing ? (
          <div>
            <input
              type="email"
              name="email"
              className={`account-input ${!isValidEmail ? "invalid" : ""}`}
              value={dataClient?.email}
              onChange={handleInputChange}
            />
            {!isValidEmail && (
              <p className="error-message">
                <small> Adresse email invalide</small>
              </p>
            )}
          </div>
        ) : (
          dataClient?.email
        )}
      </p>
      <p>
        <b>
          <span className="dotted">Téléphone</span> :
        </b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="phone"
            className="account-input"
            value={dataClient?.phone}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.phone
        )}
      </p>
      <p>
        <b>
          <span className="dotted">Adresse de livraison</span> :
        </b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="shippingAddress"
            className="account-input"
            value={dataClient?.shippingAddress}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.shippingAddress
        )}
      </p>
      {isEditing ? (
        <button
          className="btn"
          onClick={() => handleChangeProfilSave(dataClient, clientId)}
        >
          Enregistrer les modifications
        </button>
      ) : (
        <button className="btn" onClick={handleChangeProfilEdit}>
          Modifier les Informations
        </button>
      )}
    </div>
  );
};

export default InfoClient;
