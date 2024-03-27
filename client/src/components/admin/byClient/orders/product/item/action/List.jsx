import React from "react";
import * as actions from "../../../../../../../constants/orderProductsActions";
import Credit from "./Credit";
import { generateItemTransactionComponent } from "./handler/item";

const List = ({
  material,
  interaction,
  orderProductsActions,
  orderProductsInfo,
  productStore,
  client,
  orderId,
  productsId,
  orderProducts,
  articleNumber,
  setProductActions,
  setConfirmation,
  setInteraction,
  setEntryError,
}) => {
  const {
    isAddCredit,
    isAddRefund,
    isAddExchange,
    creditContent,
    refundContent,
    exchangeContent,
  } = orderProductsActions;

  return (
    <ul className="actions-list">
      {generateItemTransactionComponent(
        actions.EXCHANGE,
        actions.EXCHANGE_LABEL,
        isAddExchange,
        exchangeContent,
        "Nombre d'articles à échanger",
        material, 
        actions,
        interaction,
        productsId,
        orderId,
        orderProducts,
        orderProductsInfo,
        productStore,
        orderProductsActions,
        articleNumber,
        setEntryError,
        setProductActions,
        setInteraction,
        setConfirmation
      )}
      {generateItemTransactionComponent(
        actions.REFUND,
        actions.REFUND_LABEL,
        isAddRefund,
        refundContent,
        "Nombre d'articles à rembourser",
        material,
        actions,
        interaction,
        productsId,
        orderId,
        orderProducts,
        orderProductsInfo,
        productStore,
        orderProductsActions,
        articleNumber,
        setEntryError,
        setProductActions,
        setInteraction,
        setConfirmation
      )}
      <Credit
        material={material}
        interaction={interaction}
        action={actions?.CREDIT}
        actions={actions}
        label={actions?.CREDIT_LABEL}
        orderProductsInfo={orderProductsInfo}
        isActionSelected={isAddCredit}
        inputCreditAmount={creditContent?.amount}
        inputDateValue={creditContent?.dateExpire}
        orderProductsActions={orderProductsActions}
        placeholderValue="Montant de l'avoir"
        textCancel="ANNULER L'AVOIR"
        client={client}
        productsId={productsId}
        orderId={orderId}
        orderProducts={orderProducts}
        setProductActions={setProductActions}
        setEntryError={setEntryError}
        setConfirmation={setConfirmation}
        setInteraction={setInteraction}
      />
    </ul>
  );
};

export default List;
