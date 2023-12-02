import React from "react";
import * as actions from "../../../../../../../constants/productsActions";
import Credit from "./Credit";
import { generateItemTransactionComponent } from "./handler/item";

const List = ({
  interaction,
  productsActions,
  productState,
  productStore,
  clientId,
  orderId,
  productId,
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
  } = productsActions;

  return (
    <ul className="actions-list">
      {generateItemTransactionComponent(
        actions.EXCHANGE,
        actions.EXCHANGE_LABEL,
        isAddExchange,
        exchangeContent,
        "Nombre d'articles à échanger",
        actions,
        interaction,
        clientId,
        productId,
        orderId,
        productState,
        productStore,
        productsActions,
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
        clientId,
        productId,
        orderId,
        productState,
        productStore,
        productsActions,
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
        productState={productState}
        isActionSelected={isAddCredit}
        inputCreditAmount={creditContent?.amount}
        inputDateValue={creditContent?.dateExpire}
        productsActions={productsActions}
        placeholderValue="Montant de l'avoir"
        textCancel="ANNULER L'AVOIR"
        clientId={clientId}
        productId={productId}
        orderId={orderId}
        setProductActions={setProductActions}
        setEntryError={setEntryError}
        setConfirmation={setConfirmation}
        setInteraction={setInteraction}
      />
    </ul>
  );
};

export default List;
