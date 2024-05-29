import React from "react";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { formatPrice } from "../../../../helpers/utils/prices";

const Giftcard = ({ card }) => {
  return (
    <li>
      <p>
        {" "}
        <span className="underline">Montant </span>: {formatPrice(card?.amount)}{" "}
      </p>
      <p>
        <span className="underline">Achetée le </span> :{" "}
        {formatDate(card?.createdAt)}{" "}
      </p>
      <p>
        {" "}
        <span className="underline">Date d'expiration</span> :{" "}
        {formatDate(card?.dateExpire)}{" "}
      </p>
      <p>
        <span className="underline">Code numérique</span> : {card?.code}{" "}
      </p>
      {card?.consumerId && (
        <p className="text-used">
          <span className="underline">Utilisée le</span> :{" "}
          {formatDate(card?.updatedAt)}{" "}
        </p>
      )}
      <span className={`tag-isUsed ${card?.consumerId ? "used" : "available"}`}>
        {card?.consumerId ? "Utilisée" : "Toujours valable"}{" "}
      </span>
    </li>
  );
};

export default Giftcard;
