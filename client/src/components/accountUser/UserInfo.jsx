import React from "react";

const UserInfo = ({ userData }) => {
  return (
    <div className="user-info-account">
      <h2>Informations du compte</h2>
      <p><b>Prénom :</b> {userData.firstName}</p>
      <p><b>Nom : </b>{userData.lastName}</p>
      <p><b>Email :</b> {userData.email}</p>
      <p><b>Téléphone :</b> {userData.phone}</p>
      <p><b>Adresse de livraison :</b> {userData.address}</p>
    </div>
  );
};

export default UserInfo;
