export const useCancelEntryHandler = (actions, setProductActions) => {
  const handleCancelEntry = (e, setEntryError, action) => {
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

  return { handleCancelEntry };
};
