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
import ConfirmationModal from "../../../../../shared/confirmationModal";

const Item = ({ product, clientId, orderId }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isAddNote, setIsAddNote] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

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

  const isCreditValue = productState.generateCredit;

  const toggleActions = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleActionClick = (action) => {
    switch (action) {
      case actions.ADD_NOTE:
        setIsAddNote(!isAddNote);
        break;
      case actions.GENERATE_CREDIT:
        handleGenerateCredit();
        break;
      case actions.EXCHANGE:
      case actions.REFUND:
      case actions.CANCEL_MENTION:
        handleCreditAction(action);
        break;
      default:
        console.log("Error action clic");
    }
  };

  const handleGenerateCredit = () => {
    dispatch(
      processProduct({
        clientId,
        productId,
        orderId,
        process: actions.GENERATE_CREDIT,
        creditValue: "coucou",
      })
    );
  };

  const handleCreditAction = (action) => {
    if (isCreditValue !== null) {
      setIsConfirmationVisible(true);
      setConfirmAction(action);
    } else {
      dispatch(
        processProduct({
          clientId,
          productId,
          orderId,
          process: action,
        })
      );
    }
  };

  const handleConfirmation = () => {
    setIsConfirmationVisible(false);
    if (confirmAction) {
      dispatch(
        processProduct({
          clientId,
          productId,
          orderId,
          process: confirmAction,
        })
      );
      setConfirmAction(null);
    }
  };

  const handleCancel = () => {
    setIsConfirmationVisible(false);
    setConfirmAction(null);
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
      {isConfirmationVisible && (
        <ConfirmationModal
          message="⚠️ Cette action supprimera définitivement l'avoir que vous avez généré."
          handleConfirmation={handleConfirmation}
          handleCancel={handleCancel}
        />
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
