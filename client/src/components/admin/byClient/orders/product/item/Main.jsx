import React, { useState } from "react";
import { getProductStateInfo } from "../../../../../../helpers/storeDataUtils";
import ToggleButtonNote from "../ToggleButtonNote";
import ConfirmationModal from "../../../../../../shared/confirmationModal";
import Header from "./Header";
import Actions from "./Actions";
import ActionsHandler from "./ActionsHandler";
import { useSelector } from "react-redux";

const Main = ({ product, clientId, orderId }) => {
  const { productId, material, quantity } = product;
  const productActionsState = useSelector((state) => state.productActions);
  const { productState, isTagProductExisted } = getProductStateInfo(
    productActionsState,
    clientId,
    orderId,
    productId
  );

  const [interaction, setInteraction] = useState({
    isActionsOpen: false,
    activeLi: null,
  });
  const [confirmation, setConfirmation] = useState({
    isConfirmationVisible: false,
    confirmAction: null,
  });
  const { isConfirmationVisible } = confirmation;

  const [productActions, setProductActions] = useState({
    isAddNote: productState.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: "",
    creditContent: "",
    refundContent: "",
    exchangeContent: "",
  });

  const toggleActions = () => {
    setInteraction((prevState) => ({
      ...prevState,
      isActionsOpen: !prevState.isActionsOpen,
    }));
  };
  const actionsHandler = ActionsHandler({
    confirmation,
    productActions,
    setProductActions,
    setConfirmation,
    setInteraction,
    clientId,
    productId,
    orderId,
  });

  return (
    <li
      className={`product-content ${interaction.isActionsOpen ? "open" : ""}`}
    >
      <Header
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
        <Actions
          handleChangeInputValue={actionsHandler.handleChangeInputValue}
          handleConfirmEntry={actionsHandler.handleConfirmEntry}
          handleCancelEntry={actionsHandler.handleCancelEntry}
          interaction={interaction}
          setInteraction={setInteraction}
          productActions={productActions}
          setProductActions={setProductActions}
          setConfirmation={setConfirmation}
          productState={productState}
        />
      )}
      {isConfirmationVisible && (
        <ConfirmationModal
          message="⚠️ Cette action entraîne une suppression définitive !"
          handleConfirmation={actionsHandler.handleConfirmation}
          handleCancel={actionsHandler.handleCancel}
        />
      )}
      {productActions.isAddNote && (
        <ToggleButtonNote
          setProductActions={setProductActions}
          noteContent={productActions.noteContent}
          handleChangeInputValue={actionsHandler.handleChangeInputValue}
          handleConfirmEntry={actionsHandler.handleConfirmEntry}
          handleCancelEntry={actionsHandler.handleCancelEntry}
        />
      )}
    </li>
  );
};

export default Main;
