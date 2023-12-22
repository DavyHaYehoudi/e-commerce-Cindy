import React, { useState } from "react";

const InfoClient = ({ dataClient, onSaveChanges }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...dataClient });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveChanges = () => {
    // Appelle la fonction onSaveChanges pour sauvegarder les modifications
    // onSaveChanges(editedUserData);

    // Désactive le mode édition
    setEditing(false);
  };

  return (
    <div className="user-info-account">
      <h2>Informations</h2>
      <p>
        <b>Prénom :</b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="firstName"
            className="account-input"
            value={editedUserData.firstName}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.firstName
        )}
      </p>
      <p>
        <b>Nom : </b>
        {isEditing ? (
          <input
            type="text"
            name="lastName"
            className="account-input"
            value={editedUserData.lastName}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.lastName
        )}
      </p>
      <p>
        <b>Email :</b>{" "}
        {isEditing ? (
          <input
            type="email"
            name="email"
            className="account-input"
            value={editedUserData.email}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.email
        )}
      </p>
      <p>
        <b>Téléphone :</b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="phone"
            className="account-input"
            value={editedUserData.phone}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.phone
        )}
      </p>
      <p>
        <b>Adresse de livraison :</b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="address"
            className="account-input"
            value={editedUserData.address}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.address
        )}
      </p>
      {isEditing ? (
        <button className="btn" onClick={handleSaveChanges}>
          Enregistrer les modifications
        </button>
      ) : (
        <button className="btn" onClick={() => setEditing(true)}>
          Modifier les Informations
        </button>
      )}
    </div>
  );
};

export default InfoClient;
