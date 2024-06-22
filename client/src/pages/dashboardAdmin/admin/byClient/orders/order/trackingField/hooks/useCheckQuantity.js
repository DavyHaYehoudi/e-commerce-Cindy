import { getProductsInfo } from "../../../../../../../../selectors/orderProducts";

const useCheckQuantity = () => {
  const handleCheckQuantity = (
    inputValues,
    ordersStore,
    orderProductsStore,
    orderId,
    checkboxStates,
    setError,
    setIsFormValid,
  ) => {
    let isQuantityValid = true;
    setError("");

    if (Object.entries(checkboxStates).length === 0) {
      setError(`⚠️ Veuillez cocher une case`);
      isQuantityValid = false;
      return;
    }

    Object.entries(inputValues).forEach(([orderProductsId, value]) => {
      const maxQuantity = getProductsInfo(
        ordersStore,
        orderProductsStore,
        orderId,
        orderProductsId
      ).articleNumber;
      const numericValue = parseInt(value, 10);

      if (numericValue > maxQuantity) {
        setError(
          `⚠️ Le nombre maximum d'articles pour cette ligne (${maxQuantity}) a été dépassé !`
        );
        isQuantityValid = false;
      }
    });

    setIsFormValid(isQuantityValid);
  };

  return { handleCheckQuantity };
};

export default useCheckQuantity;
