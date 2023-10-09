import React, { useState } from "react";

const UserInfo = ({ userData, onSaveChanges }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });

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
            value={editedUserData.firstName}
            onChange={handleInputChange}
          />
        ) : (
          userData.firstName
        )}
      </p>
      <p>
        <b>Nom : </b>
        {isEditing ? (
          <input
            type="text"
            name="lastName"
            value={editedUserData.lastName}
            onChange={handleInputChange}
          />
        ) : (
          userData.lastName
        )}
      </p>
      <p>
        <b>Email :</b>{" "}
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editedUserData.email}
            onChange={handleInputChange}
          />
        ) : (
          userData.email
        )}
      </p>
      <p>
        <b>Téléphone :</b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="phone"
            value={editedUserData.phone}
            onChange={handleInputChange}
          />
        ) : (
          userData.phone
        )}
      </p>
      <p>
        <b>Adresse de livraison :</b>{" "}
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={editedUserData.address}
            onChange={handleInputChange}
          />
        ) : (
          userData.address
        )}
      </p>
      {isEditing ? (
        <button className="btn" onClick={handleSaveChanges}>
          Enregistrer les modifications
        </button>
      ) : (
        <button className="btn" onClick={() => setEditing(true)}>Modifier les Informations</button>
      )}
    </div>
  );
};

export default UserInfo;
