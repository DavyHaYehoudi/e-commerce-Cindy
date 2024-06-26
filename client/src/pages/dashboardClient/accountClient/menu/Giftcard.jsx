import React from "react";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { formatPrice } from "../../../../helpers/utils/prices";
import isCurrent from "../../../../helpers/utils/isCurrentDate";

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
      <span
        className={`tag ${
          card?.consumerId || !isCurrent(card?.dateExpire)
            ? "not-available"
            : "available"
        }`}
      >
        {card?.consumerId || !isCurrent(card?.dateExpire)
          ? "Non valable"
          : "Toujours valable"}{" "}
      </span>
    </li>
  );
};

export default Giftcard;
