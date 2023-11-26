import React from "react";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import Confirm from "./Confirm";

const TrackingFieldAdmin = ({
  trackingNumberListItem,
  products,
  clientId,
  orderId,
}) => {
  return (
    <div className="trackingFieldAdmin-container">
      <div className="trackingFieldAdmin-content">
        <div className="trackingFieldAdmin-number">
          <label>Numéro d'envoi : </label>
          <input type="text" id="trackingFieldAdmin-number-input" value="" />
        </div>
        <div className="trackingFieldAdmin-product">
          <ArticleNumberByProduct
            trackingNumberListItem={trackingNumberListItem}
            products={products}
            clientId={clientId}
            orderId={orderId}
          />
        </div>
        <div className="trackingFieldAdmin-confirm">
          <Confirm />
        </div>
      </div>
    </div>
  );
};

export default TrackingFieldAdmin;
