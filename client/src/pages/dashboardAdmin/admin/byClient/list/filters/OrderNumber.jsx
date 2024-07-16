import React from "react";

const OrderNumber = ({ OrderNumber, handleChangeOrderNumber }) => {
  return (
    <div className="filterBlock-content-subBlock orderNumber">
      <p className="underline">№ DE COMMANDE :</p>
      <input
        type="text"
        id="orderNumber"
        className="account-input"
        value={OrderNumber}
        onChange={handleChangeOrderNumber}
      />
    </div>
  );
};

export default OrderNumber;
