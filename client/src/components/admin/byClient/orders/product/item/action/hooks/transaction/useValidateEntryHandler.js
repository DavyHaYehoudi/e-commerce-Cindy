import { articleAction, totalsInOut } from "../../../../../../../../../features/admin/ordersSlice";

export const useValidateEntryHandler = (
  actions,
  productsInfo,
  productsActions,
  articleNumber,
  setEntryError,
  dispatch,
  updateActionContent,
) => {
  const handleValidateEntry = (
    e,
    action,
    clientId,
    productId,
    orderId,
    setProductActions,
    productPrice
  ) => {
    e.stopPropagation();

    const exchangeValue =
      productsInfo?.exchange ?? productsActions?.exchangeContent ?? 0;
    const refundValue =
      productsInfo?.refund ?? productsActions?.refundContent ?? 0;

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

    const productActionContent = productsActions[contentKey] || "";

    if (productsActions[contentKey] > 0 && checkArticleNumber) {
      dispatch(
        updateActionContent({
          productId,
          updatedProperty: action,
          isClientNotified: false,
          productActionContent,
        })
      );
      if (action === actions.REFUND) {
        dispatch(
          totalsInOut({
            orderId,
            amount: productsActions.refundContent * productPrice,
            movement: "out",
          })
        );
      }
      dispatch(articleAction({ clientId, orderId }));
      setEntryError("");
    }
    if (productsActions[contentKey]) {
      const dynamicProperties = { [contentKey]: "", [flagKey]: false };
      setProductActions((prevState) => ({
        ...prevState,
        ...dynamicProperties,
      }));
    }
  };

  return { handleValidateEntry };
};
