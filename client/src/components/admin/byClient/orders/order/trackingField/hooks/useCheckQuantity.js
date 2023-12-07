import { getProductsInfo } from "../../../../../../../selectors/products";

const useCheckQuantity = () => {
  const handleCheckQuantity = (
    inputValues,
    ordersStore,
    productsStore,
    orderId,
    checkboxStates,
    setError,
    setIsFormValid
  ) => {
    let isQuantityValid = true;
    setError("");

    if (Object.entries(checkboxStates).length === 0) {
      setError(`⚠️ Veuillez cocher une case`);
      isQuantityValid = false;
      return;
    }

    Object.entries(inputValues).forEach(([productId, value]) => {
      const maxQuantity = getProductsInfo(
        ordersStore,
        productsStore,
        orderId,
        productId
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
