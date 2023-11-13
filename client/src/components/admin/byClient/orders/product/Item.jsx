import React, { useState } from "react";
import ToggleButton from "../../../../../shared/ToggleButton";
import { useDispatch } from "react-redux";
import { updateNoteContent } from "../../../../../features/admin/productActionsSlice";

const Item = ({ product, clientId, orderId }) => {
  const { productId, name, material, quantity, price, image, productActions } =
    product;
  const dispatch = useDispatch();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [noteContent, setNoteContent] = useState(
    productActions.addNoteProduct || ""
  );
  const isTagProducExisted =
    productActions.exchange ||
    productActions.refund ||
    productActions.generateCredit;
    
  const toggleActions = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleActionClick = (action) => {
    console.log(`Action selected: ${action}`);
  };
  const handleNoteProduct = (e) => {
    setNoteContent(e.target.value);
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
      <div className="product-content-details" onClick={toggleActions}>
        <span>
          Référence: {productId} - {name} - {material} - {quantity} unité
          {quantity > 1 ? "s" : ""} - {price}{" "}
        </span>
        <img src={image} alt={name} width="50px" />
        <span className={isTagProducExisted ? "product-tag" : ""}>
          <small>
            {productActions.exchange
              ? "ECHANGE"
              : productActions.refund
              ? "REMBOURSEMENT"
              : productActions.generateCredit}
          </small>
        </span>
      </div>
      {isActionsOpen && (
        <ul className="actions-list">
          <li onClick={() => handleActionClick("Echange")}>Echange</li>
          <li onClick={() => handleActionClick("Remboursement")}>
            Remboursement
          </li>
          <li onClick={() => handleActionClick("Générer un avoir")}>
            Générer un avoir
          </li>
          <li onClick={() => handleActionClick("Ajouter une note")}>
            Ajouter une note
          </li>
          <li onClick={() => handleActionClick("Annuler la mention")}>
            Annuler la mention
          </li>
        </ul>
      )}
      {productActions.addNoteProduct && (
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
