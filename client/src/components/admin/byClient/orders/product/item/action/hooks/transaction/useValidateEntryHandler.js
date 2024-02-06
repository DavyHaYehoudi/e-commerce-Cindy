import {
  updateOrder,
} from "../../../../../../../../../features/admin/ordersSlice";

export const useValidateEntryHandler = (
  actions,
  productsByOrder,
  productsByOrderInfo,
  productsByOrderActions,
  articleNumber,
  setEntryError,
  dispatch,
  updateActionContent
) => {
  const handleValidateEntry = (
    e,
    action,
    orderId,
    setProductActions,
    productPrice
  ) => {
    e.stopPropagation();

    const exchangeValue =
      productsByOrderInfo?.exchange ??
      productsByOrderActions?.exchangeContent ??
      0;
    const refundValue =
      productsByOrderInfo?.refund ?? productsByOrderActions?.refundContent ?? 0;
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

    const productActionContent = productsByOrderActions[contentKey] || "";

    if (productsByOrderActions[contentKey] > 0 && checkArticleNumber) {
      dispatch(
        updateActionContent({
          updatedProperty: action,
          isClientNotified: false,
          productActionContent,
          productsByOrderId: productsByOrder._id,
        })
      );
      if (action === actions.REFUND) {
        dispatch(
          updateOrder({
            orderId,
            amount: productsByOrderActions.refundContent * productPrice,
            movement: "out",
            actionType:"totalsInOut"
          })
        );
      }
      // dispatch(updateOrder({ orderId, actionType: "articleAction" }));
      setEntryError("");
    }
    if (productsByOrderActions[contentKey]) {
      const dynamicProperties = { [contentKey]: "", [flagKey]: false };
      setProductActions((prevState) => ({
        ...prevState,
        ...dynamicProperties,
      }));
    }
  };

  return { handleValidateEntry };
};
