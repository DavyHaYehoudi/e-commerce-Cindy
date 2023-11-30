import { v4 as uuidv4 } from "uuid";
import { getProductDetails } from "../../../../../../../helpers/storeDataUtils";
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
  productActions,
  clientId,
  orderId,
  setError,
  setIsFormValid
) => {
  let isQuantityValid = true;
  setError("");
  Object.entries(inputValues).forEach(([productId, value]) => {
    const maxQuantity = getProductDetails(
      productActions,
      clientId,
      orderId,
      parseInt(productId)
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
