import React from "react";
import ToggleButtonNote from "../ToggleButtonNote";
import Header from "./Header";
import List from "./action/List";
import ConfirmationModal from "../../../../../../../shared/confirmationModal";
import * as actions from "../../../../../../../constants/orderProductsActions";
import Totals from "./Totals";
import useOrderProducts from "./hooks/useOrderProducts";

const Main = ({ orderProducts, client, orderId }) => {
  const {
    productsId,
    material,
    quantity,
    productStore,
    amount,
    orderProductsInfo,
    isTagProductExisted,
    articleNumber,
    getOneOrderProducts,
    interaction,
    setInteraction,
    confirmation,
    setConfirmation,
    entryError,
    setEntryError,
    orderProductsActions, 
    setProductActions,
    toggleActions,
  } = useOrderProducts(orderProducts, orderId);

  const { isConfirmationVisible } = confirmation;

  return (
    <li
      className={`product-content ${interaction.isActionsOpen ? "open" : ""}`}
      data-testid={`product-content-${orderProducts?._id}`}
    >
      <Header
        interaction={interaction}
        material={material}
        quantity={quantity}
        productsId={productsId}
        orderProducts={orderProducts}
        isTagProductExisted={isTagProductExisted}
        orderProductsInfo={orderProductsInfo}
        productStore={productStore}
        toggleActions={toggleActions}
        getOneOrderProducts={getOneOrderProducts}
      />
      {interaction.isActionsOpen && (
        <List
          material={material}
          interaction={interaction}
          orderProductsActions={orderProductsActions}
          orderProductsInfo={orderProductsInfo}
          productStore={productStore}
          client={client}
          orderId={orderId}
          productsId={productsId}
          orderProducts={orderProducts}
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
          orderProductsActions={orderProductsActions}
          actions={actions}
          orderId={orderId}
          orderProducts={orderProducts}
          amount={amount}
          orderProductsInfo={orderProductsInfo}
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
            orderProductsInfo={orderProductsInfo}
            orderProducts={orderProducts}
          />
        </div>
      }
      <Totals
        orderProductsInfo={orderProductsInfo}
        orderProducts={orderProducts}
      />
    </li>
  );
};

export default Main;
