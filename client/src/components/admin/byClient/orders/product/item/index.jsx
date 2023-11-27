import React, { useState } from "react";
import {
  getProductDetails,
  getProductStateInfo,
} from "../../../../../../helpers/storeDataUtils";
import ToggleButtonNote from "../ToggleButtonNote";
import ConfirmationModal from "../../../../../../shared/confirmationModal";
import Header from "./Header";
import List from "./action/List";
import * as actions from "../../../../../../constants/productActions";
import { useSelector } from "react-redux";
import Totals from "./Totals";

const Main = ({ product, clientId, orderId }) => {
  const { productId, material, quantity } = product;
  const productsState = useSelector((state) => state.products);
  const productActionsState = useSelector((state) => state.productActions);
  const { productState, isTagProductExisted } = getProductStateInfo(
    productActionsState,
    clientId,
    orderId,
    productId
  );
  const { articleNumber } = getProductDetails(
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
    isAddNote: productState?.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: productState?.note,
    creditContent: productState?.credit,
    refundContent: null,
    exchangeContent: null,
  });

  const toggleActions = () => {
    setInteraction((prevState) => ({
      ...prevState,
      isActionsOpen: !prevState.isActionsOpen,
    }));
  };

  return (
    <li
      className={`product-content ${interaction.isActionsOpen ? "open" : ""}`}
    >
      <Header
        interaction={interaction}
        material={material}
        quantity={quantity}
        productId={productId}
        isTagProductExisted={isTagProductExisted}
        productState={productState}
        productsState={productsState}
        toggleActions={toggleActions}
      />
      {interaction.isActionsOpen && (
        <List
          interaction={interaction}
          productActions={productActions}
          productState={productState}
          productsState={productsState}
          clientId={clientId}
          orderId={orderId}
          productId={productId}
          articleNumber={articleNumber}
          setProductActions={setProductActions}
          setConfirmation={setConfirmation}
          setInteraction={setInteraction}
          setEntryError={setEntryError}
        />
      )}
      {isConfirmationVisible && (
        <ConfirmationModal
          message="⚠️ Cette action entraîne une suppression définitive !"
          confirmation={confirmation}
          productActions={productActions}
          actions={actions}
          clientId={clientId}
          productId={productId}
          orderId={orderId}
          productsState={productsState}
          productState={productState}
          setProductActions={setProductActions}
          setConfirmation={setConfirmation}
          setEntryError={setEntryError}
          setInteraction={setInteraction}
        />
      )}
      {entryError && <p className="error-message">{entryError}</p>}
      {
        <div className="product-note-container">
          <ToggleButtonNote
            productState={productState}
            clientId={clientId}
            productId={productId}
            orderId={orderId}
            actions={actions}
          />
        </div>
      }
      <Totals productState={productState} productId={productId} />
    </li>
  );
};

export default Main;