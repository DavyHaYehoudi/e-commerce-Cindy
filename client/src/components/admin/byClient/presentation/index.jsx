import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import Details from "../preferences";
import ToggleButton from "../../../../shared/ToggleButton";
import NotesEditor from "../../../../shared/NotesEditor";
import Orders from "./Orders";

const Infos = ({
  client,
  orders,
  handleClientClick,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
      <Orders
        client={client}
        orders={orders}
        setSelectedOrderId={setSelectedOrderId}
        selectedOrderId={selectedOrderId}
      />
      <NotesEditor clientId={client.id} notesPropName={"notesAdmin"} />
      <div className="close-client-details">
        <span onClick={() => handleClientClick(client.id)}>Fermer</span>
      </div>
    </div>
  );
};

export default Infos;
