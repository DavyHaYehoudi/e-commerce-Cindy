import React from "react";
import { useSelector } from "react-redux";
import AdminTrackingItem from "./AdminTrackingItem";
import ClientTrackingItem from "./ClientTrackingItem";

const List = ({ trackingNumberList, clientId, orderId }) => {
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);

  return (
    <div className="trackingNumberList">
      LISTING
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

export default List;
