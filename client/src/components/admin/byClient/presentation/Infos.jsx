import React from "react";
import { MdEmail } from "react-icons/md";
import Details from "../preferences/Details";
import ToggleButton from "../../../../shared/ToggleButton";
import Item from "../orders/order/Item";
import NotesEditor from "../../../../shared/NotesEditor";
import { formatPrice } from "../../../../helpers/prices";

const Infos = ({ client, orders, handleClientClick }) => {
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
      {client.wishlist && (
        <ToggleButton
          initialText="Afficher ses préférences"
          hiddenText="Fermer ses préférences"
          buttonClass="account-btn toggle"
          content={
            <div className="clientPreferenceDetails">
              <Details client={client} />
            </div>
          }
        />
      )}

      {orders && (
        <>
          <h2>
            <u>Historique des commandes</u>{" "}
          </h2>
          <p>Total des commandes : {client.totalOrders}</p>
          <p>
            Valeur totale des commandes :{" "}
            <span className="pricing inPricing">
              {" "}
              {formatPrice(client.totalOrderValue)}
            </span>
          </p>
          <ToggleButton
            initialText="Afficher ses commandes"
            hiddenText="Fermer ses commandes"
            buttonClass="account-btn toggle"
            content={
              <div className="orders">
                {orders.map((order, i) => (
                  <Item
                    key={order.id}
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
            }
          />
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
