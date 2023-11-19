import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { processProduct } from "../../../../../features/admin/productActionsSlice";
import { getProductStateInfo } from "../../../../../helpers/storeDataUtils";
import ToggleButtonNote from "./ToggleButtonNote";
import ConfirmationModal from "../../../../../shared/confirmationModal";
import ItemHeader from "./ItemHeader";
import ItemActions from "./ItemActions";

const ItemIndex = ({ product, clientId, orderId }) => {
  const dispatch = useDispatch();
  const [interaction, setInteraction] = useState({
    isActionsOpen: false,
    activeLi: null,
  });
  const [confirmation, setConfirmation] = useState({
    isConfirmationVisible: false,
    confirmAction: null,
  });
  const [productActions, setProductActions] = useState({
    isAddNote: false,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    creditAmount: "",
    refundAmount: "",
    exchangeAmount: "",
  });

  const productActionsState = useSelector((state) => state.productActions);

  const { productId, material, quantity } = product;

  const { productState, noteContent, isTagProductExisted } =
    getProductStateInfo(productActionsState, clientId, orderId, productId);

  const toggleActions = () => {
    setInteraction((prevState) => ({
      ...prevState,
      isActionsOpen: !prevState.isActionsOpen,
    }));
  };

  const handleConfirmation = () => {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: false,
    }));
    if (confirmation.confirmAction) {
      dispatch(
        processProduct({
          clientId,
          productId,
          orderId,
          process: confirmation.confirmAction,
          creditValue:null
        })
      );
      setConfirmation((prevState) => ({ ...prevState, confirmAction: null }));
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
        creditAmount: "" 
      }));
    }
  };

  const handleCancel = () => {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: false,
      confirmAction: null
    }));
    setInteraction((prevState) => ({
      ...prevState,
      activeLi: null,
    }));
  };

  return (
    <li
      className={`product-content ${interaction.isActionsOpen ? "open" : ""}`}
    >
      <ItemHeader
        product={product}
        toggleActions={toggleActions}
        interaction={interaction}
        material={material}
        quantity={quantity}
        productId={productId}
        isTagProductExisted={isTagProductExisted}
        productState={productState}
      />
      {interaction.isActionsOpen && (
        <ItemActions
          clientId={clientId}
          productId={productId}
          orderId={orderId}
          interaction={interaction}
          setInteraction={setInteraction}
          productActions={productActions}
          setProductActions={setProductActions}
          setConfirmation={setConfirmation}
          productState={productState}
        />
      )}
      {confirmation.isConfirmationVisible && (
        <ConfirmationModal
          message="⚠️ Cette action supprimera définitivement l'avoir."
          handleConfirmation={handleConfirmation}
          handleCancel={handleCancel}
        />
      )}
      {(productState.note || productActions.isAddNote) && (
        <ToggleButtonNote
          setProductActions={setProductActions}
          noteContent={noteContent}
          clientId={clientId}
          productId={productId}
          orderId={orderId}
        />
      )}
    </li>
  );
};

export default ItemIndex;
