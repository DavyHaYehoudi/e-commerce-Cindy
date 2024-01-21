import React, { useState } from "react";
import ToggleButtonNote from "../ToggleButtonNote";
import ConfirmationModal from "../../../../../../shared/ConfirmationModal";
import Header from "./Header";
import List from "./action/List";
import * as actions from "../../../../../../constants/productsActions";
import { useSelector } from "react-redux";
import Totals from "./Totals";
import { getProductsInfo } from "../../../../../../selectors/products";
import { getCreditsInfo } from "../../../../../../selectors/credits";

const Main = ({ products, client, orderId }) => {
  const { productId, material, quantity } = products;
  const ordersStore = useSelector((state) => state?.orders?.data);
  const productsStore = useSelector((state) => state?.products?.data);
  const productStore = useSelector((state) => state?.product?.data);
  const { amount } = useSelector((state) =>
    getCreditsInfo(state, { productId: products.id })
  );

  const { productsInfo, isTagProductExisted, articleNumber } = getProductsInfo(
    ordersStore,
    productsStore,
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

  const [productsActions, setProductActions] = useState({
    isAddNote: productsInfo?.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: productsInfo?.note,
    creditContent: productsInfo?.credit,
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
      data-testid ={`product-content-${productId}`}
    >
      <Header
        interaction={interaction}
        material={material}
        quantity={quantity}
        productId={productId}
        products={products}
        isTagProductExisted={isTagProductExisted}
        productsInfo={productsInfo}
        productStore={productStore}
        toggleActions={toggleActions}
      />
      {interaction.isActionsOpen && (
        <List
          interaction={interaction}
          productsActions={productsActions}
          productsInfo={productsInfo}
          productStore={productStore}
          client={client}
          orderId={orderId}
          productId={productId}
          products={products}
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
          productsActions={productsActions}
          actions={actions}
          client={client}
          productId={productId}
          orderId={orderId}
          products={products}
          amount={amount}
          productStore={productStore}
          productsInfo={productsInfo}
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
            productsInfo={productsInfo}
            client={client}
            productId={productId}
            orderId={orderId}
            actions={actions}
          />
        </div>
      }
      <Totals
        productsInfo={productsInfo}
        productId={productId}
        products={products}
      />
    </li>
  );
};

export default Main;
