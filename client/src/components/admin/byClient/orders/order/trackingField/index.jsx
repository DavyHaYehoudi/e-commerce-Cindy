import React from "react";
import { useSelector } from "react-redux";
import AdminTrackingItem from "./AdminTrackingItem";
import ClientTrackingItem from "./ClientTrackingItem";
import AdminTrackingNumberCreate from "./AdminTrackingNumberCreate";

const Listing = ({ trackingNumberList, clientId, orderId }) => {
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);
  const handleValidate = () => {};
  const handleCancel = () => {};

  return (
    <div className="trackingNumberList">
      <p  className="addTrackingNumberBtn">Ajouter un numéro de suivi</p>
      <AdminTrackingNumberCreate
        clientId={clientId}
        orderId={orderId}
        handleValidate={handleValidate}
        handleCancel={handleCancel}
      />
      {(trackingNumberList ?? []).map((item) =>
        item.isAdmin ? (
          <AdminTrackingItem
            key={item.id}
            item={item}
            clientId={clientId}
            orderId={orderId}
            productsStore={productsStore}
            productActions={productActions}
          />
        ) : (
          <ClientTrackingItem key={item.id} item={item} />
        )
      )}
    </div>
  );
};

export default Listing;
