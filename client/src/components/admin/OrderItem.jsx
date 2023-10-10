import React, { useState } from "react";
import { formatDate } from "../../helpers/formatDate";
import { getStatusColor } from "../../helpers/getStatusColor";
import OrderProductsList from "./OrderProductsList";
import { Link } from "react-router-dom";
import { orderStatus } from "../../mocks/orderStatus";
import { ordersMock } from "../../mocks/ordersMock";
import { userInfo } from "../../mocks/userInfo";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { MdOutlineAppRegistration } from "react-icons/md";
import { RiPassValidFill } from "react-icons/ri";

const OrderItem = ({ client, order, handleStatusChange }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [creationDate, setCreationDate] = useState(null);
  const [lastModifiedDate, setLastModifiedDate] = useState(null);
  const [sendDate, setSendDate] = useState(null);

  const handleTrackingNumberChange = (event) => {
    setTrackingNumber(event.target.value);
    if (!creationDate) {
      setCreationDate(new Date());
    }
    setLastModifiedDate(new Date());
  };

  const handleSaveTrackingNumber = () => {
    setIsEditing(false);
  };

  const handleEditTrackingNumber = () => {
    setIsEditing(true);
  };

  const handleDeleteTrackingNumber = () => {
    setTrackingNumber("");
    setIsEditing(true);
    setCreationDate(null);
    setLastModifiedDate(null);
    setSendDate(null);
  };

  const handleSendToDatabase = () => {
    setSendDate(new Date());
    const dataToSend = {
      trackingNumber: trackingNumber,
      orderStatus: order.status,
    };
  };

  return (
    <div className="admin-order-item">
      <div className="admin-order-item-header">
        <p>Date de commande : {formatDate(order.date)}</p>
        {order.status === orderStatus[2].name && (
          <Link
            to={`/admin/generate-invoice/${order.id}`}
            state={{ order: ordersMock[0], user: userInfo }}
          >
            <button className="account-display-toggle-btn">
              Générer la facture
            </button>
          </Link>
        )}
       <FcCheckmark />
       <MdOutlineAppRegistration />
        <button onClick={handleSendToDatabase}>
        <RiPassValidFill />
        </button>
       
      </div>
      <p>
        <span
          style={{
            backgroundColor: getStatusColor(order.status),
            color: "#fff",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {order.status}
        </span>
      </p>
      <p>Total de la commande : {order.totalAmount}</p>
      <p>
        {order.paymentMethod["cardType"]} se terminant par :{" "}
        {order.paymentMethod["last4Digits"]}{" "}
      </p>

      <h3>
        {order.products.length === 1 ? "Produit" : "Produits"} de la commande :
      </h3>

      <OrderProductsList products={order.products} />

      {order.status === orderStatus[2].name && (
        <div>
          <div className="tracking-field">
            <label
              htmlFor="trackingNumber"
              style={{ color: trackingNumber ? "black" : "red" }}
            >
              № DE SUIVI DE COMMANDE :
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  id="trackingNumber"
                  placeholder="Entrer le numéro de suivi"
                  value={trackingNumber}
                  onChange={handleTrackingNumberChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveTrackingNumber();
                    }
                  }}
                />
                <button onClick={handleSaveTrackingNumber}>Valider</button>
              </>
            ) : (
              <>
                {trackingNumber && (
                  <>
                    <span style={{ color: "black" }}>{trackingNumber}</span>
                    <button onClick={handleEditTrackingNumber}>
                      <MdModeEditOutline />{" "}
                    </button>
                    <button onClick={handleDeleteTrackingNumber}>
                      <BsTrash />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          {sendDate && (
            <div className="admin-trackingNumber-dates date-text">
              <p>
                Envoyé sur le compte du client : {formatDate(sendDate)} (
                {trackingNumber}){" "}
              </p>
            </div>
          )}
        </div>
      )}
      <div className="admin-order-next-step">
        <button
          className="move-to-next-step"
          onClick={() =>
            handleStatusChange(
              client.id,
              order.id,
              order.status // Utilisez le statut actuel de la commande
            )
          }
        >
          Passer à l'étape suivante
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
