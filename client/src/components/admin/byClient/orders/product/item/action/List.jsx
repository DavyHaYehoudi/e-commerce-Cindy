import React from "react";
import * as actions from "../../../../../../../constants/productsByOrderActions";
import Credit from "./Credit";
import { generateItemTransactionComponent } from "./handler/item";

const List = ({
  interaction,
  productsByOrderActions,
  productsByOrderInfo,
  productStore,
  client,
  orderId,
  productId,
  productsByOrder,
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
  } = productsByOrderActions;

  return (
    <ul className="actions-list" >
      {generateItemTransactionComponent(
        actions.EXCHANGE,
        actions.EXCHANGE_LABEL,
        isAddExchange,
        exchangeContent,
        "Nombre d'articles à échanger",
        actions,
        interaction,
        productId,
        orderId,
        productsByOrder,
        productsByOrderInfo,
        productStore,
        productsByOrderActions,
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
        actions,
        interaction,
        productId,
        orderId,
        productsByOrder,
        productsByOrderInfo,
        productStore,
        productsByOrderActions,
        articleNumber,
        setEntryError,
        setProductActions,
        setInteraction,
        setConfirmation
      )}
      <Credit
        interaction={interaction}
        action={actions?.CREDIT}
        actions={actions}
        label={actions?.CREDIT_LABEL}
        productsByOrderInfo={productsByOrderInfo}
        isActionSelected={isAddCredit}
        inputCreditAmount={creditContent?.amount}
        inputDateValue={creditContent?.dateExpire}
        productsByOrderActions={productsByOrderActions}
        placeholderValue="Montant de l'avoir"
        textCancel="ANNULER L'AVOIR"
        client={client}
        productId={productId}
        orderId={orderId}
        productsByOrder={productsByOrder}
        setProductActions={setProductActions}
        setEntryError={setEntryError}
        setConfirmation={setConfirmation}
        setInteraction={setInteraction}
      />
    </ul>
  );
};

export default List;
