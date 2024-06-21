import {
  isClientNotified,
  totalsInOut,
} from "../../../../../../../../../../features/admin/ordersSlice";

export const useValidateEntryHandler = (
  actions,
  orderProducts,
  orderProductsInfo,
  orderProductsActions,
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
    finalPrice
  ) => {
    e.stopPropagation();

    const exchangeValue =
      orderProductsInfo?.exchange ??
      orderProductsActions?.exchangeContent ??
      0;
    const refundValue =
      orderProductsInfo?.refund ?? orderProductsActions?.refundContent ?? 0;
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

    const productActionContent = orderProductsActions[contentKey] || "";

    if (orderProductsActions[contentKey] > 0 && checkArticleNumber) {
      dispatch(
        updateActionContent({
          orderProductsId: orderProducts._id,
          updatedProperty: action,
          productActionContent,
        })
      );
      dispatch(isClientNotified({orderId}));
      if (action === actions.REFUND) {
        dispatch(
          totalsInOut({
            orderId,
            amount: orderProductsActions.refundContent * finalPrice,
            movement: "out",
          })
        );
      }
      setEntryError("");
    }
    if (orderProductsActions[contentKey]) {
      const dynamicProperties = { [contentKey]: "", [flagKey]: false };
      setProductActions((prevState) => ({
        ...prevState,
        ...dynamicProperties,
      }));
    }
  };

  return { handleValidateEntry };
};
