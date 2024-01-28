import React from "react";
import { formatPrice } from "../../../../helpers/utils/prices";
import Item from "../orders/order";
import Badge from "./Badge";

const Orders = ({ orders, client, setSelectedOrderId, selectedOrderId }) => {
  const renderBadge = (step, orderIds, orderId) => {
    const count = orders?.filter((order) => order?.step === step).length;
    if (count > 0) {
      return (
        <Badge
          step={step}
          orderIds={orderIds}
          orderId={orderId}
          count={count}
          setSelectedOrderId={setSelectedOrderId}
        />
      );
    }
    return null;
  };

  return (
    orders && (
      <>
        <h2>
          <span className="underline">Historique des commandes</span>{" "}
        </h2>
        <p><span className="dotted">Total des commandes :</span> {client?.totalOrders}</p>
        <div className="client-details-orders-info">
         <span className="dotted">Valeur totale des commandes :</span> 
          <span className="pricing inPricing">
            {" "}
            {formatPrice(client?.totalOrderValue)}
          </span> 
          <ul className="client-details-orders-badge">
            {orders &&
              orders.length > 0 &&
              [...new Set(orders.map((order) => order?.step))].map(
                (step, index) => {
                  const orderId = orders.find(
                    (order) => order?.step === step
                  )?._id;
                  const orderIds = orders
                    .filter((order) => order?.step === step)
                    .map((order) => order?._id);

                  return (
                    <li key={index}>{renderBadge(step, orderIds, orderId)}</li>
                  );
                }
              )}
          </ul>
        </div>
        <div className="orders-container">
          <div className="orders">
            <div className="orders">
              {selectedOrderId && (
                <div className="selected-items" data-testid="selected-items">
                  {orders
                    .filter((order) => selectedOrderId.includes(order._id))
                    .map((order, i) => (
                      <Item
                        key={i}
                        client={client}
                        order={order}
                        orderIndex={i}
                        isClientNotified={order.isClientNotified}
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
