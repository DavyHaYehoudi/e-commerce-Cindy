import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processProduct } from "../../../../../features/admin/productActionsSlice";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import * as actions from "../../../../../constants/productActions";
import {
  getProductStateInfo,
  getProductProperties,
} from "../../../../../helpers/storeDataUtils";
import ToggleButtonNote from "./ToggleButtonNote";

const Item = ({ product, clientId, orderId }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isAddNote, setIsAddNote] = useState(false);

  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.products);
  const productActionsState = useSelector((state) => state.productActions);

  const { productId, material, quantity } = product;
  const { reference, name, pricing, image } = getProductProperties(
    productId,
    productsState
  );
  const { productState, noteContent, isTagProductExisted } =
    getProductStateInfo(productActionsState, clientId, orderId, productId);

  const toggleActions = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleActionClick = (action) => {
    switch (action) {
      case actions.ADD_NOTE:
        setIsAddNote(!isAddNote);
        break;
      case actions.EXCHANGE:
      case actions.REFUND:
      case actions.GENERATE_CREDIT:
      case actions.CANCEL_MENTION:
        dispatch(
          processProduct({
            clientId,
            productId,
            orderId,
            process: action,
            creditValue: "coucou",
          })
        );
        break;
      default:
        console.log("Error action clic");
    }
  };

  return (
    <li className={`product-content ${isActionsOpen ? "open" : ""}`}>
      <div className="product-content-details">
        <span>
          Référence : {reference} - {name} - {material} - {quantity} unité
          {quantity > 1 ? "s" : ""} - {pricing.currentPrice} {"€"}{" "}
        </span>
        <img src={image} alt={name} width="50px" />
        <span className={isTagProductExisted ? "product-tag" : ""}>
          <small>
            {productState.exchange
              ? "ECHANGE"
              : productState.refund
              ? "REMBOURSEMENT"
              : productState.generateCredit}
          </small>
        </span>
        <span className="action-icon" onClick={toggleActions}>
          {" "}
          {isActionsOpen ? <FaEllipsisVertical /> : <IoEllipsisHorizontal />}
        </span>
      </div>
      {isActionsOpen && (
        <ul className="actions-list">
          <li onClick={() => handleActionClick(actions.EXCHANGE)}>Echange</li>
          <li onClick={() => handleActionClick(actions.REFUND)}>
            Remboursement
          </li>
          <li onClick={() => handleActionClick(actions.GENERATE_CREDIT)}>
            Générer un avoir
          </li>
          <li onClick={() => handleActionClick(actions.ADD_NOTE)}>
            Ajouter une note
          </li>
          <li onClick={() => handleActionClick(actions.CANCEL_MENTION)}>
            Annuler la mention
          </li>
        </ul>
      )}
      {(productState.addNoteProduct || isAddNote) && (
        <ToggleButtonNote
          isAddNote={isAddNote}
          setIsAddNote={setIsAddNote}
          noteContent={noteContent}
          clientId={clientId}
          productId={productId}
          orderId={orderId}
        />
      )}
    </li>
  );
};

export default Item;
