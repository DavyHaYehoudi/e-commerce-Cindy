export const useInputQuantityHandler = (actions, setProductActions) => {
  const handleChangeInputQuantity = (e, action) => {
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

  return { handleChangeInputQuantity };
};
