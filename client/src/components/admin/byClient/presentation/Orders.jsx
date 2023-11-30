import React from "react";
import { formatPrice } from "../../../../helpers/prices";
import { renderBadge } from "./handle/badges";
import Item from "../orders/order";

const Orders = ({
  orders,
  client,
  ordersStore,
  setSelectedOrderId,
  selectedOrderId,
}) => {
  return (
    orders && (
      <>
        <h2>
          <u>Historique des commandes</u>{" "}
        </h2>
        <p>Total des commandes : {client.totalOrders}</p>
        <div className="client-details-orders-info">
          Valeur totale des commandes :{" "}
          <span className="pricing inPricing">
            {" "}
            {formatPrice(client?.totalOrderValue)}
          </span>
          <ul className="client-details-orders-badge">
            {orders &&
              orders.length > 0 &&
              [...new Set(orders.map((order) => order.step))].map(
                (step, index) => {
                    const orderId = orders.find((order) => order.step === step)?.id;
                  const orderIds = orders
                    .filter((order) => order.step === step)
                    .map((order) => order.id);

                  return (
                    <li key={index}>
                      {
                        renderBadge(
                          ordersStore,
                          step,
                          client,
                          setSelectedOrderId,
                          orderIds,
                          orderId
                        ).stepBadge
                      }
                    </li>
                  );
                }
              )}
          </ul>
        </div>
        <div className="orders-container">
          <div className="orders">
            <div className="orders">
              {selectedOrderId && (
                <div className="selected-items">
                  {orders
                    .filter((order) => selectedOrderId.includes(order.id))
                    .map((order, i) => (
                      <Item
                        key={i}
                        clientId={client.id}
                        order={order}
                        orderIndex={i}
                        isClientNotified={order.isClientNotified}
                        trackingNumberAdmin={order.trackingNumberAdmin}
                        trackingNumberClient={order.trackingNumberClient}
                        lastSentDateToClient={order.lastSentDateToClient}
                        step={order.step}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <hr></hr>
      </>
    )
  );
};

export default Orders;
