import React, { useState } from "react";
import ToggleButtonNote from "../ToggleButtonNote";
import Header from "./Header";
import List from "./action/List";
import ConfirmationModal from "../../../../../../shared/confirmationModal"
import * as actions from "../../../../../../constants/productsByOrderActions";
import { useSelector } from "react-redux";
import Totals from "./Totals";
import { getProductsInfo } from "../../../../../../selectors/productsByOrder";
import { getCreditsInfo } from "../../../../../../selectors/credit";

const Main = ({ productsByOrder, client, orderId }) => {
  const { productId, material, quantity } = productsByOrder;
  const ordersStore = useSelector((state) => state?.orders?.data);
  const productsByOrderStore = useSelector((state) => state?.productsByOrder?.data);
  const productStore = useSelector((state) => state?.product?.data);
  const { amount } = useSelector((state) =>
    getCreditsInfo(state, { productId: productsByOrder._id })
  );

  const { productsByOrderInfo, isTagProductExisted, articleNumber } = getProductsInfo(
    ordersStore,
    productsByOrderStore,
    orderId,
    productId,
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

  const [productsByOrderActions, setProductActions] = useState({
    isAddNote: productsByOrderInfo?.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: productsByOrderInfo?.note,
    creditContent: productsByOrderInfo?.credit,
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
        productsByOrder={productsByOrder}
        isTagProductExisted={isTagProductExisted}
        productsByOrderInfo={productsByOrderInfo}
        productStore={productStore}
        toggleActions={toggleActions}
      />
      {interaction.isActionsOpen && (
        <List
          interaction={interaction}
          productsByOrderActions={productsByOrderActions}
          productsByOrderInfo={productsByOrderInfo}
          productStore={productStore}
          client={client}
          orderId={orderId}
          productId={productId}
          productsByOrder={productsByOrder}
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
          productsByOrderActions={productsByOrderActions}
          actions={actions}
          productId={productId}
          orderId={orderId}
          productsByOrder={productsByOrder}
          amount={amount}
          productStore={productStore}
          productsByOrderInfo={productsByOrderInfo}
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
            productsByOrderInfo={productsByOrderInfo}
            productsByOrder={productsByOrder}
          />
        </div>
      }
      <Totals
        productsByOrderInfo={productsByOrderInfo}
        productId={productId}
        productsByOrder={productsByOrder}
      />
    </li>
  );
};

export default Main;
