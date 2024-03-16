import React from "react";
import { BsTrash } from "react-icons/bs";
import { formatDate } from "../../../helpers/utils/formatDate";

const PromocodesCard = ({ promocode, onDelete }) => {
  return (
    <div className="card">
      <div className="card-header">{promocode.name}</div>
      <div className="card-body">
        <p className="card-name">{promocode.code} </p>
        <p className="card-percentage">{promocode.percentage}%</p>
        <p className="card-expiration">
          Créé le : <br/>{formatDate(promocode.createdAt)}
        </p>
        <p className="card-expiration">
          Expire le : <br/>{formatDate(promocode.dateExpire)}
        </p>
      </div>
      <button
        className="delete-button icon-trash account-btn"
        onClick={() => onDelete(promocode._id)}
      >
        <BsTrash />{" "}
      </button>
    </div>
  );
};

export default PromocodesCard;
