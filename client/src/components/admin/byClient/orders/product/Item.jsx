import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import {
  processProduct,
  updateNoteContent,
} from "../../../../../features/admin/productActionsSlice";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import * as actions from "../../../../../constants/productActions";

const Item = ({ product, clientId, orderId }) => {
  console.log("coucou");
  const dispatch = useDispatch();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isAddNote, setIsAddNote] = useState(false);

  const { productId, name, material, quantity, productActions } = product;

  const productRef = useSelector((state) =>
    state.products.find((prod) => prod.id === productId)
  );

  const productState =useSelector(state=>state.productActions
    .find((user) => user.id === clientId)
    ?.orders.find((order) => order.id === orderId)
    ?.products.find((prod) => prod.id === product.id)?.productActions
    )
  const noteContent = useSelector(
    (state) =>
      state.productActions
        .find((user) => user.id === clientId)
        ?.orders.find((order) => order.id === orderId)
        ?.products.find((prod) => prod.id === product.id)?.productActions
        .addNoteProduct
  );

  const isTagProducExisted =
    productState.exchange ||
    productState.refund ||
    productState.generateCredit;

  const toggleActions = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleActionClick = (action) => {
    switch (action) {
      case "addNoteProduct":
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
        console.log("");
    }
  };

  const handleNoteProduct = (e) => {
    dispatch(
      updateNoteContent({
        clientId,
        productId,
        orderId,
        content: e.target.value,
      })
    );
  };

  return (
    <li className={`product-content ${isActionsOpen ? "open" : ""}`}>
      <div className="product-content-details">
        <span>
          Référence: {productRef.reference} - {productRef.name} - {material} -{" "}
          {quantity} unité
          {quantity > 1 ? "s" : ""} - {productRef.pricing.currentPrice} {"€"}{" "}
        </span>
        <img src={productRef.image} alt={name} width="50px" />
        <span className={isTagProducExisted ? "product-tag" : ""}>
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
          <li onClick={() => handleActionClick("addNoteProduct")}>
            Ajouter une note
          </li>
          <li onClick={() => handleActionClick(actions.CANCEL_MENTION)}>
            Annuler la mention
          </li>
        </ul>
      )}
      {(productActions.addNoteProduct || isAddNote) && (
        <ToggleButton
          initialText="note"
          hiddenText="Fermer"
          buttonClass="account-btn toggle"
          content={
            <p>
              <textarea
                className="product-note"
                value={noteContent}
                onChange={(e) => handleNoteProduct(e)}
              >
                {" "}
              </textarea>
            </p>
          }
        />
      )}
    </li>
  );
};

export default Item;
