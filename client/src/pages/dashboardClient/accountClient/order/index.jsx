import React, { useState } from "react";
import Item from "./Item";
import ToggleButton from "../../../../shared/ToggleButton";
import { formatDate } from "../../../../helpers/utils/formatDate";
import OrderStep from "../../../../shared/OrderStep";
import { orderStep } from "../../../../constants/orderStep";
import { getOrderStepProperty } from "../../../../helpers/constants/orderStep";
import { formatPrice } from "../../../../helpers/utils/prices";
import TrackingNumberList from "./trackingFiled";
import TrackingNumberCreate from "./trackingFiled/TrackingNumberCreate";
import { useSelector } from "react-redux";

const List = ({ orderHistory, filter }) => {
  const [openOrderId, setOpenOrderId] = useState(null);
  const ordersStore = useSelector((state) => state?.customer?.data?.orders);
  const getAdvantages = (orderId) => {
    const order = ordersStore.find((order) => order?._id === orderId);
    const amountPromocode = order?.amountPromoCode;
    const amountGiftcard = order?.amountGiftcard;
    const amountCredit = order?.amountCredit;
    return { amountPromocode, amountGiftcard, amountCredit };
  };

  return (
    <div className="other-orders" data-testid="list-orders">
      {orderHistory &&
        orderHistory.filter(filter).map((order) => (
          <div key={order?._id} className="order-item-wrapper-user-account">
            <div className="header">
              <div className="date-step">
                <span>
                  <span className="dotted">Date de commande</span> :{" "}
                  {formatDate(order?.createdAt)}
                </span>
                <p>
                  <span className="dotted">№ de commande</span> :{" "}
                  {order?.statusPayment === "paid" ? (
                    order?.orderNumber
                  ) : (
                    <span style={{ color: "var(--danger)" }}>
                      ECHEC DE PAYMENT
                    </span>
                  )}{" "}
                </p>

                <OrderStep order={order} />
              </div>
              <div className="details">
                <div>
                  <span className="dotted">Prix total</span> :{" "}
                  <span className="outPricing">
                    {formatPrice(order?.inTotalAmount) || "Total NC"}
                  </span>{" "}
                  {getAdvantages(order?._id)?.amountPromocode &&
                    `(code promotion ${
                      getAdvantages(order?._id)?.amountPromocode
                    }% inclus)`}
                  <p>
                    {getAdvantages(order?._id)?.amountGiftcard &&
                      `Carte cadeau de ${formatPrice(
                        getAdvantages(order?._id)?.amountGiftcard
                      )} utilisée`}
                  </p>
                  <p>
                    {getAdvantages(order?._id)?.amountCredit &&
                      `Avoir de ${formatPrice(
                        getAdvantages(order?._id)?.amountCredit
                      )} utilisé`}
                  </p>
                </div>
              </div>
            </div>
            <ToggleButton
              initialText="Détails"
              hiddenText="Fermer"
              buttonClass="account-btn toggle"
              content={
                <div className="order-header-details">
                  {" "}
                  {/* <p>
                    <span className="dotted">Moyen de paiement</span> :{" "}
                    {order?.paymentMethod["cardType"]}
                  </p>
                  <p>
                    {" "}
                    <span className="dotted">Se terminant par</span> :{" "}
                    {order?.paymentMethod["last4Digits"]}{" "}
                  </p> */}
                  <div>
                    <span className="dotted">Adresse de livraison</span> :
                    <p>
                      {order?.shippingAddress?.firstName}{" "}
                      {order?.shippingAddress?.lastName}
                    </p>
                    <p>{order?.shippingAddress?.email}</p>
                    <p>{order?.shippingAddress?.phone}</p>
                    <p>{order?.shippingAddress?.street}</p>
                    <p>
                      {order?.shippingAddress?.postalCode}{" "}
                      {order?.shippingAddress?.city}
                    </p>
                  </div>
                  <div>
                    <span className="dotted">Adresse de facturation</span> :
                    <p>{order?.billingAddress?.companyName}</p>
                    <p>
                      {order?.billingAddress?.firstName}{" "}
                      {order?.billingAddress?.lastName}
                    </p>
                    <p>{order?.billingAddress?.email}</p>
                    <p>{order?.billingAddress?.phone}</p>
                    <p>{order?.billingAddress?.street}</p>
                    <p>
                      {order?.billingAddress?.postalCode}{" "}
                      {order?.billingAddress?.city}
                    </p>
                  </div>
                </div>
              }
            />
            <ToggleButton
              initialText="Afficher les articles"
              hiddenText="Fermer les articles"
              buttonClass="account-btn toggle"
              content={
                <Item
                  orderProducts={order?.orderProducts}
                  orderId={order?._id}
                />
              }
            />
            {getOrderStepProperty(order?.step)?.name === orderStep[3].name &&
              order.trackingNumber &&
              order.trackingNumber.every((tn) => tn?.isAdmin !== false) && (
                <div>
                  <button
                    className="account-btn addTrackingNumberClientBtn"
                    onClick={() =>
                      setOpenOrderId(
                        openOrderId === order._id ? null : order._id
                      )
                    }
                  >
                    Ajouter un numéro de suivi pour un retour
                  </button>
                  {openOrderId === order._id && (
                    <TrackingNumberCreate orderId={order._id} />
                  )}
                </div>
              )}

            <div className="trackingNumber">
              {order?.trackingNumber.length > 0
                ? order.trackingNumber.map((trk) => (
                    <TrackingNumberList key={trk?.id} trk={trk} order={order} />
                  ))
                : "№ suivi de commande en attente d'être communiqué"}
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
