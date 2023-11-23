import React from "react";
import * as actions from "../../../../../../../constants/productActions";
import Credit from "./Credit";
import { generateItemTransactionComponent } from "./handler/item";

const List = ({
  interaction,
  productActions,
  productState,
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
  } = productActions;

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
        productActions,
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
        productActions,
        articleNumber,
        setEntryError,
        setProductActions,
        setInteraction,
        setConfirmation
      )}
      <Credit
        interaction={interaction}
        action={actions.CREDIT}
        actions={actions}
        label={actions.CREDIT_LABEL}
        productState={productState}
        isActionSelected={isAddCredit}
        inputCreditAmount={creditContent.amount}
        inputDateValue={creditContent.dateExpire}
        productActions={productActions}
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
