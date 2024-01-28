import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import Details from "../preferences";
import ToggleButton from "../../../../shared/ToggleButton";
import NotesEditor from "../../../../shared/NotesEditor";
import Orders from "./Orders";
import { formatDate } from "../../../../helpers/utils/formatDate";

const Infos = ({ client, orders, handleClientClick }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div
      className="client-details"
      onClick={(e) => e.stopPropagation()}
      data-testid={`infos-component-${client?._id}`}
    >
      <h2>
        <span className="underline"> Informations du client</span>
      </h2>
      <p><span className="dotted">Prénom </span> : {client?.firstName}</p>
      <p><span className="dotted">Nom </span>:  {client?.lastName}</p>
      <p className="client-details-email">
        <span className="dotted">Email {" "}</span>: 
        <a href={`mailto:${client?.email}`}>
        {" "} {client?.email}{" "}
          <MdEmail className="icon" aria-label="Email du client" />
        </a>
      </p>
      <p><span className="dotted">Téléphone </span>:  {client?.phone}</p>
      <p><span className="dotted">Adresse de livraison </span>:  {client?.shippingAddress}</p>
      <p><span className="dotted">Compte créé le </span>:  {formatDate(client?.createdAt)} </p>
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
      <NotesEditor clientId={client._id} notesPropName={"notesAdmin"} />
      <div className="close-client-details">
        <span onClick={() => handleClientClick(client._id)}>Fermer</span>
      </div>
    </div>
  );
};

export default Infos;
