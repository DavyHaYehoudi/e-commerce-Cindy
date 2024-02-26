import React, { useState } from "react";
import Item from "./Item";
import ToggleButton from "../../../shared/ToggleButton";
import { formatDate } from "../../../helpers/utils/formatDate";
import OrderStep from "../../../shared/OrderStep";
import { orderStep } from "../../../constants/orderStep";
import { getOrderStepProperty } from "../../../helpers/constants/orderStep";
import { formatPrice } from "../../../helpers/utils/prices";
import TrackingNumberList from "./trackingFiled";
import TrackingNumberCreate from "./trackingFiled/TrackingNumberCreate";

const List = ({ orderHistory, filter }) => {
  const [trackingNumberBoxOpen, setTrackingNumberBoxOpen] = useState(false);
  return (
    <div className="other-orders" data-testid="list-orders">
      {orderHistory &&
        orderHistory.filter(filter).map((order) => (
          <div key={order._id} className="order-item-wrapper-user-account">
            <div className="header">
              <div className="date-step">
                <span>
                  <span className="dotted">Date de commande</span> :{" "}
                  {formatDate(order?.createdAt)}
                </span>
                <OrderStep order={order} />
              </div>
              <div className="details">
                <p>
                  <span className="dotted">Prix total</span> :{" "}
                  <span className="outPricing">{formatPrice(order?.inTotalAmount) || "Total NC"}</span> 
                </p>
                <p>
                  <span className="dotted">Moyen de paiement</span> :{" "}
                  {order?.paymentMethod["cardType"]}
                </p>
                <p>
                  {" "}
                  <span className="dotted">Se terminant par</span> :{" "}
                  {order?.paymentMethod["last4Digits"]}{" "}
                </p>
              </div>
            </div>

            <ToggleButton
              initialText="Afficher les articles"
              hiddenText="Fermer les articles"
              buttonClass="account-btn toggle"
              content={
                <Item
                  orderProducts={order?.orderProducts}
                  orderId={order._id}
                />
              }
            />
            {getOrderStepProperty(order?.step).name === orderStep[3].name &&
              order.trackingNumber &&
              order.trackingNumber.every((tn) => tn.isAdmin !== false) && (
                <div>
                  <button
                    className="account-btn addTrackingNumberClientBtn"
                    onClick={() =>
                      setTrackingNumberBoxOpen(!trackingNumberBoxOpen)
                    }
                  >
                    Ajouter un numéro de suivi pour un retour
                  </button>
                  {trackingNumberBoxOpen && (
                    <TrackingNumberCreate
                      orderId={order._id}
                      setTrackingNumberBoxOpen={setTrackingNumberBoxOpen}
                    />
                  )}
                </div>
              )}

            <div className="trackingNumber">
              {order?.trackingNumber?.length > 0
                ? order.trackingNumber.map((trk) => (
                    <TrackingNumberList key={trk.id} trk={trk} order={order} />
                  ))
                : "№ suivi de commande en attente d'être communiqué"}
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
