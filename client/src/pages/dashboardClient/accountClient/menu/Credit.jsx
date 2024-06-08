import React from "react";
import { formatDate } from "../../../../helpers/utils/formatDate";
import { formatPrice } from "../../../../helpers/utils/prices";
import isCurrent from "../../../../helpers/utils/isCurrentDate";

const Credit = ({ credit }) => {
  return (
    <li>
      <p>
        {" "}
        <span className="underline">Montant </span>:{" "}
        {formatPrice(credit?.amount)}{" "}
      </p>
      <p>
        <span className="underline">Obtenu le </span> :{" "}
        {formatDate(credit?.createdAt)}{" "}
      </p>
      <p>
        {" "}
        <span className="underline">Date d'expiration</span> :{" "}
        {formatDate(credit?.dateExpire)}{" "}
      </p>
      <p>
        <span className="underline">Code numérique</span> : {credit?.code}{" "}
      </p>
      {credit?.isArchived && (
        <p className="text-used">
          <span className="underline">Utilisé le</span> :{" "}
          {formatDate(credit?.updatedAt)}{" "}
        </p>
      )}
      <span
        className={`tag ${
          credit?.isArchived || !isCurrent(credit?.dateExpire)
            ? "not-available"
            : "available"
        }`}
      >
        {credit?.isArchived || !isCurrent(credit?.dateExpire)
          ? "Non valable"
          : "Toujours valable"}{" "}
      </span>
    </li>
  );
};

export default Credit;
