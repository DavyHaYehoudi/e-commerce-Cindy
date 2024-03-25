import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { formatDate } from "../../../helpers/utils/formatDate";

const PromocodesCard = ({ promocode, handleDeletePromocode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-wrapper">
        <div>{promocode.name}</div>
        <div>
          <p>{promocode.code} </p>
          <p>
            {promocode.percentage}% jusqu'au :<br />{" "}
            {formatDate(promocode.dateExpire)}
          </p>
        </div>
        {isHovered && (
          <button
            className="delete-button icon-trash account-btn"
            onClick={() => handleDeletePromocode(promocode._id)}
          >
            <BsTrash />{" "}
          </button>
        )}
      </div>
      <p className="card-created">
        <small>
          Créé le :{" "}
          {promocode.createdAt
            ? formatDate(promocode.createdAt)
            : "En cours..."}
        </small>
      </p>
    </div>
  );
};

export default PromocodesCard;
