import React, { useState } from "react";
import ToggleButtonNote from "../ToggleButtonNote";
import Header from "./Header";
import List from "./action/List";
import ConfirmationModal from "../../../../../../shared/confirmationModal"
import * as actions from "../../../../../../constants/orderProductsActions";
import { useSelector } from "react-redux";
import Totals from "./Totals";
import { getProductsInfo } from "../../../../../../selectors/orderProducts";
import { getCreditsInfo } from "../../../../../../selectors/credit";

const Main = ({ orderProducts, client, orderId }) => {
  const { productsId, material, quantity } = orderProducts;
  const ordersStore = useSelector((state) => state?.orders?.data);
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const productStore = useSelector((state) => state?.product?.data);
  const { amount } = useSelector((state) =>
    getCreditsInfo(state, { productsId: orderProducts._id })
  );

  const { orderProductsInfo, isTagProductExisted, articleNumber } = getProductsInfo(
    ordersStore,
    orderProductsStore,
    orderId,
    orderProducts._id,
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

  const [orderProductsActions, setProductActions] = useState({
    isAddNote: orderProductsInfo?.note,
    isAddCredit: false,
    isAddRefund: false,
    isAddExchange: false,
    noteContent: orderProductsInfo?.note,
    creditContent: orderProductsInfo?.credit,
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
      data-testid ={`product-content-${orderProducts?._id}`}
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
      />
      {interaction.isActionsOpen && (
        <List
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
          productsId={productsId}
          orderId={orderId}
          orderProducts={orderProducts}
          amount={amount}
          productStore={productStore}
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
        productsId={productsId}
        orderProducts={orderProducts}
      />
    </li>
  );
};

export default Main;
