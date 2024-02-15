import { v4 as uuidv4 } from "uuid";

export const articlesNumberCheck = (selectedProducts, articleNumber) => {
  let productsByOrderInfo = [];

  const selectedProductsArray = Object.entries(selectedProducts);

  selectedProductsArray.forEach(([combinedId, value]) => {
    const { productId, material } = value;

    const productData = articleNumber[combinedId] || { value: 0 };
    const articlesNumber = productData.value || 1;

    productsByOrderInfo.push({
      id: uuidv4(),
      productId,
      articlesNumber,
      material,
    });
  });

  return { productsByOrderInfo };
};
