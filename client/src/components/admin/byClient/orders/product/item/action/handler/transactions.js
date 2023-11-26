import { articleAction } from "../../../../../../../../features/admin/orderStepSlice";
import { updateTotalsInOut } from "../../../../../../../../features/admin/productActionsSlice";

export const handleChangeInputQuantity = (
  e,
  action,
  actions,
  setProductActions
) => {
  const propertyMap = {
    [actions.EXCHANGE]: "exchangeContent",
    [actions.REFUND]: "refundContent",
  };

  const contentKey = propertyMap[action];
  if (!contentKey) {
    console.log("Error in handleChangeInputQuantity");
    return;
  }
  setProductActions((prevState) => ({
    ...prevState,
    [contentKey]: parseInt(e.target.value),
  }));
};
export const handleValidateEntry = (
  e,
  action,
  actions,
  productState,
  productActions,
  articleNumber,
  setEntryError,
  dispatch,
  updateActionContent,
  clientId,
  productId,
  orderId,
  setProductActions,
  productPrice
) => {
  e.stopPropagation();

  const exchangeValue =
    productState?.exchange ?? productActions?.exchangeContent ?? 0;
  const refundValue = productState?.refund ?? productActions?.refundContent ?? 0;

  const articleLimitNumber = exchangeValue + refundValue;
  const articleAllowedNumber = articleNumber - articleLimitNumber;
  const checkArticleNumber = articleAllowedNumber >= 0;
  if (!checkArticleNumber) {
    setEntryError(
      `⚠️ Le nombre maximal d'articles (${articleNumber}) est dépassé ! `
    );
  }

  const propertyMap = {
    [actions.EXCHANGE]: {
      contentKey: "exchangeContent",
      flagKey: "isAddExchange",
    },
    [actions.REFUND]: { contentKey: "refundContent", flagKey: "isAddRefund" },
  };

  const { contentKey, flagKey } = propertyMap[action] || {};
  if (!contentKey || !flagKey) return;

  const productActionContent = productActions[contentKey] || "";

  if (productActions[contentKey] > 0 && checkArticleNumber) {
    dispatch(
      updateActionContent({
        clientId,
        productId,
        orderId,
        updatedProperty: action,
        isClientNotified:false,
        productActionContent,
      })
    );
    if (action === actions.REFUND) {
      dispatch(
        updateTotalsInOut({
          clientId,
          orderId,
          amount: productActions.refundContent * productPrice,
          movement: "out",
        })
      );
    }
    dispatch(articleAction({clientId, orderId}));
    setEntryError("");
  }
  if (productActions[contentKey]) {
    const dynamicProperties = { [contentKey]: "", [flagKey]: false };
    setProductActions((prevState) => ({
      ...prevState,
      ...dynamicProperties,
    }));
  }
};

export const handleCancelEntry = (
  e,
  setEntryError,
  setProductActions,
  action,
  actions
) => {
  e.stopPropagation();
  const propertyMap = {
    [actions.EXCHANGE]: {
      contentKey: "exchangeContent",
      flagKey: "isAddExchange",
    },
    [actions.REFUND]: { contentKey: "refundContent", flagKey: "isAddRefund" },
  };
  const { contentKey, flagKey } = propertyMap[action] || {};
  if (!contentKey || !flagKey) return;

  const dynamicProperties = { [flagKey]: false, [contentKey]: "" };

  setProductActions((prevState) => ({
    ...prevState,
    ...dynamicProperties,
  }));
  setEntryError("");
};
