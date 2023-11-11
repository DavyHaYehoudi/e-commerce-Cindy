import React from "react";
import { MdEmail } from "react-icons/md";
import Details from "../preferences/Details";
import ToggleButton from "../../../../shared/ToggleButton";
import Item from "../orders/order/Item";
import NotesEditor from "../../../../shared/NotesEditor";

const Infos = ({ client }) => {
  return (
    <div className="client-details">
      <h2>Informations du client</h2>
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

      {client.orders && (
        <>
          <h2>Historique des commandes</h2>
          <p>Total des commandes : {client.totalOrders}</p>
          <p>Valeur totale des commandes : {client.totalOrderValue}</p>
          <ToggleButton
            initialText="Afficher ses commandes"
            hiddenText="Fermer ses commandes"
            buttonClass="account-btn toggle"
            content={
              <div className="orders">
                {client.orders.map((order, i) => (
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
    </div>
  );
};

export default Infos;
