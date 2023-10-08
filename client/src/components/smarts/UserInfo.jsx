import React from "react";

const UserInfo = ({ userData }) => {
  return (
    <div className="user-info">
      <h2>Informations du compte</h2>
      <p>Nom: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Téléphone: {userData.phone}</p>
      <p>Adresse: {userData.address}</p>
    </div>
  );
};

export default UserInfo;
