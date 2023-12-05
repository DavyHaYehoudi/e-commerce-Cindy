import React from "react";
import * as actions from "../../../../../../../constants/productsActions";
import Credit from "./Credit";
import { generateItemTransactionComponent } from "./handler/item";

const List = ({
  interaction,
  productsActions,
  productsInfo,
  productStore,
  client,
  orderId,
  productId,
  products,
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
        client.id,
        productId,
        orderId,
        productsInfo,
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
        client.id,
        productId,
        orderId,
        productsInfo,
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
        productsInfo={productsInfo}
        isActionSelected={isAddCredit}
        inputCreditAmount={creditContent?.amount}
        inputDateValue={creditContent?.dateExpire}
        productsActions={productsActions}
        placeholderValue="Montant de l'avoir"
        textCancel="ANNULER L'AVOIR"
        client={client}
        productId={productId}
        orderId={orderId}
        products={products}
        setProductActions={setProductActions}
        setEntryError={setEntryError}
        setConfirmation={setConfirmation}
        setInteraction={setInteraction}
      />
    </ul>
  );
};

export default List;
