import React from "react";
import ArticleNumberByProduct from "./ArticleNumberByProduct";

const AdminTrackingNumberCreate = ({
  products,
  clientId,
  orderId,
  handleValidate,
  handleCancel,
}) => {
  return (
    <div className="AdminTrackingNumberCreate">
      <div className="trackingNumber-content">
        <label>Numéro de suivi d'envoi : </label>
        <input
          type="text"
          id="trackingNumberInput"
          placeholder="Entrer le numéro de suivi"
        />
      </div>
      <ArticleNumberByProduct
        products={products}
        clientId={clientId}
        orderId={orderId}
      />
      <div className="AdminTrackingNumberCreate-validate">
        <button onClick={handleValidate} className="btn-confirm">
          Valider
        </button>
        <button onClick={handleCancel} className="btn-cancel">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default AdminTrackingNumberCreate;
