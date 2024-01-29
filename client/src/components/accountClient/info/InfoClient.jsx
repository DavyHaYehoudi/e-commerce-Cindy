import React, { useEffect, useState } from "react";

const InfoClient = ({ dataClient, onSaveChanges }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...dataClient });

  useEffect(() => {
    setEditedUserData(dataClient);
  }, [dataClient]);

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
        <b><span className="dotted">Prénom</span> :</b>{" "}
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
        <b><span className="dotted">Nom</span> : </b>
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
        <b><span className="dotted">Email</span> :</b>{" "}
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
        <b><span className="dotted">Téléphone</span> :</b>{" "}
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
        <b><span className="dotted">Adresse de livraison</span> :</b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="address"
            className="account-input"
            value={editedUserData.shippingAddress}
            onChange={handleInputChange}
          />
        ) : (
          dataClient?.shippingAddress
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
