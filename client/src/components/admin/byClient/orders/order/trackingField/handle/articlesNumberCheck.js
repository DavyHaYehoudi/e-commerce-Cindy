import { v4 as uuidv4 } from "uuid";
import { getProductsInfo } from "../../../../../../../helpers/selectors/products";

export const articlesNumberCheck = (selectedProducts, articleNumber) => {
  let productsInfo = [];
  let articlesNumber;

  selectedProducts.forEach((productId) => {
    const productData = articleNumber[productId] || {
      value: 0,
    };

    articlesNumber = productData.value || 1;

    productsInfo.push({
      id: uuidv4(),
      productId,
      articlesNumber,
    });
  });

  return { productsInfo };
};

export const handleCheckQuantity = (
  inputValues,
  ordersStore,
  productsStore,
  orderId,
  setError,
  setIsFormValid,
  checkboxStates
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
      productId,
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
