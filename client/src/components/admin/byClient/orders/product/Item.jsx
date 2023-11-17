import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processProduct } from "../../../../../features/admin/productActionsSlice";
import { getProductStateInfo } from "../../../../../helpers/storeDataUtils";
import ToggleButtonNote from "./ToggleButtonNote";
import ConfirmationModal from "../../../../../shared/confirmationModal";
import ItemHeader from "./ItemHeader";
import ItemActions from "./ItemActions";

const Item = ({ product, clientId, orderId }) => {
  const dispatch = useDispatch();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isAddNote, setIsAddNote] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [activeLi, setActiveLi] = useState(null);
  const [isGenerateCredit, setIsGenerateCredit] = useState(false);

  const productActionsState = useSelector((state) => state.productActions);

  const { productId, material, quantity } = product;

  const { productState, noteContent, isTagProductExisted } =
    getProductStateInfo(productActionsState, clientId, orderId, productId);

  const isCreditValue = productState.generateCredit;

  const toggleActions = () => {
    setIsActionsOpen(!isActionsOpen);
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
      setIsGenerateCredit(false);
    }
  };

  const handleCancel = () => {
    setIsConfirmationVisible(false);
    setConfirmAction(null);
    setActiveLi(null);
  };

  return (
    <li className={`product-content ${isActionsOpen ? "open" : ""}`}>
      <ItemHeader
        product={product}
        toggleActions={toggleActions}
        isActionsOpen={isActionsOpen}
        material={material}
        quantity={quantity}
        productId={productId}
        isTagProductExisted={isTagProductExisted}
        productState={productState}
      />
      {isActionsOpen && (
        <ItemActions
          clientId={clientId}
          productId={productId}
          orderId={orderId}
          isCreditValue={isCreditValue}
          activeLi={activeLi}
          setActiveLi={setActiveLi}
          isGenerateCredit={isGenerateCredit}
          isAddNote={isAddNote}
          setIsAddNote={setIsAddNote}
          setIsGenerateCredit={setIsGenerateCredit}
          setIsConfirmationVisible={setIsConfirmationVisible}
          setConfirmAction={setConfirmAction}
          productState={productState}
        />
      )}
      {isConfirmationVisible && (
        <ConfirmationModal
          message="⚠️ Cette action supprimera définitivement l'avoir."
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
