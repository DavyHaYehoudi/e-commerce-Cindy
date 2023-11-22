import React, { useState } from "react";
import {
  getArticleNumberByProduct,
  getProductStateInfo,
} from "../../../../../../helpers/storeDataUtils";
import ToggleButtonNote from "../ToggleButtonNote";
import ConfirmationModal from "../../../../../../shared/confirmationModal";
import Header from "./Header";
import Actions from "./action/Actions";
import * as actions from "../../../../../../constants/productActions";
import ActionsHandler from "./action/handler/ActionsHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCancel,
  handleConfirmation,
} from "./action/handler/confirmation";
import { handleChangeNoteValue } from "./action/handler/notes";

const Main = ({ product, clientId, orderId }) => {
  const dispatch = useDispatch();
  const { productId, material, quantity } = product;
  const productActionsState = useSelector((state) => state.productActions);
  const { productState, isTagProductExisted } = getProductStateInfo(
    productActionsState,
    clientId,
    orderId,
    productId
  );
  const { articleNumber } = getArticleNumberByProduct(
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
  const [entryError, setEntryError] = useState(false);

  const [productActions, setProductActions] = useState({
    isAddNote: productState.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: productState.note,
    creditContent: productState.credit,
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
    clientId,
    productId,
    orderId,
    articleNumber,
    productState,
    setProductActions,
    setConfirmation,
    setInteraction,
    setEntryError,
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
          handleChangeInputQuantity={actionsHandler.handleChangeInputQuantity}
          handleChangeInputDate={actionsHandler.handleChangeInputDate}
          handleChangeInputCreditAmount={
            actionsHandler.handleChangeInputCreditAmount
          }
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
          handleConfirmation={() =>
            handleConfirmation(
              confirmation,
              productActions,
              setProductActions,
              actions,
              setConfirmation,
              setEntryError,
              clientId,
              productId,
              orderId,
              dispatch
            )
          }
          handleCancel={() => handleCancel(setConfirmation, setInteraction)}
        />
      )}
      {entryError && <p className="error-message">{entryError}</p>}
      {
        <ToggleButtonNote
          dispatch={dispatch}
          clientId={clientId}
          productId={productId}
          orderId={orderId}
          actions={actions}
          productState={productState}
          setProductActions={setProductActions}
          noteContent={productActions.noteContent}
          handleChangeNoteValue={handleChangeNoteValue}
          handleConfirmEntry={actionsHandler.handleConfirmEntry}
          handleCancelEntry={actionsHandler.handleCancelEntry}
        />
      }
    </li>
  );
};

export default Main;
