import React from "react";
import { MdEmail } from "react-icons/md";
import Details from "../preferences/Details";
import ToggleButton from "../../../../shared/ToggleButton";
import Item from "../orders/order/Item";
import NotesEditor from "../../../../shared/NotesEditor";
import { formatPrice } from "../../../../helpers/prices";
import Summary from "../orders/order/summary";
import { getClientItemInfo } from "../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";

const Infos = ({ client, orders, handleClientClick }) => {
  const state = useSelector((state) => state.ordersStep);
  const { renderBadge } = getClientItemInfo(
    state,
    client
  );
  return (
    <div className="client-details" onClick={(e) => e.stopPropagation()}>
      <h2>
        <u> Informations du client</u>
      </h2>
      <p>Prénom : {client.firstName}</p>
      <p>Nom : {client.lastName}</p>
      <p className="client-details-email">
        Email :{" "}
        <a href={`mailto:${client.email}`}>
          {client.email}{" "}
          <MdEmail className="icon" aria-label="Email du client" />
        </a>
      </p>
      <p>Téléphone : {client.phone}</p>
      <p>Adresse : {client.shippingAddress}</p>
        <div className="wishlist-container">

          <ToggleButton
            initialText="Afficher les préférences"
            hiddenText="Fermer les préférences"
            buttonClass="account-btn toggle"
            content={
              <div className="clientPreferenceDetails">
                <Details client={client} />
              </div>
            }
          />
        </div>
      <hr></hr>

      {orders && (
        <>
          <h2>
            <u>Historique des commandes</u>{" "}
          </h2>
          <p>Total des commandes : {client.totalOrders}</p>
          <div  className="client-details-orders-info">
            Valeur totale des commandes :{" "}
            <span className="pricing inPricing">
              {" "}
              {formatPrice(client.totalOrderValue)}
            </span>
            <p className="client-details-orders-badge">
              {orders &&
                orders.length > 0 &&
                [...new Set(orders.map((order) => order.step))].map(
                  (step) => renderBadge(step).stepBadge
                )}
            </p>
          </div>
          <div className="orders-container">

          <ToggleButton
            initialText="Afficher les commandes"
            hiddenText="Fermer les commandes"
            buttonClass="account-btn toggle"
            content={
              <div className="orders">
                {orders.map((order, i) => (
                  <Summary
                    key={order.id}
                    initialText={`commande ${i + 1}`}
                    hiddenText={`Fermer la commande ${i + 1}`}
                    buttonClass="account-btn toggle order"
                    clientId={client.id}
                    orderId={order.id}
                    content={
                      <Item
                        clientId={client.id}
                        order={order}
                        orderIndex={i}
                        isClientNotified={order.isClientNotified}
                        trackingNumberAdmin={order.trackingNumberAdmin}
                        trackingNumberClient={order.trackingNumberClient}
                        lastSentDateToClient={order.lastSentDateToClient}
                        step={order.step}
                      />
                    }
                  />
                ))}
              </div>
            }
          />
          </div>
          <hr></hr>
        </>
      )}

      <NotesEditor clientId={client.id} notesPropName={"notesAdmin"} />
      <div className="close-client-details">
        <span onClick={() => handleClientClick(client.id)}>Fermer</span>
      </div>
    </div>
  );
};

export default Infos;
