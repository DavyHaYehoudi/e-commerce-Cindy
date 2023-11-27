import React from "react";
import { formatDate } from "../../../../../../helpers/formatDate";
import ProductListItem from "./ProductListItem";

const AdminTrackingItem = ({
  item,
  clientId,
  orderId,
  productsStore,
  productActions,
}) => (
  <div className="trackingNumberAdminItem" key={item.id}>
    <div className="header">
      <p>{`Numéro de suivi d'envoi : ${item.value}`} <small>- Envoyé le {formatDate(item.date)}</small> 
      </p>
    </div>
    <ul className="products">
      {item.products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          clientId={clientId}
          orderId={orderId}
          productsStore={productsStore}
          productActions={productActions}
        />
      ))}
    </ul>
  </div>
);

export default AdminTrackingItem;
