import { v4 as uuidv4 } from "uuid";

export const articlesNumberCheck = (selectedProducts, articleNumber) => {
  let productsByOrderInfo = [];
  let articlesNumber;

  selectedProducts.forEach((productId) => {
    const productData = articleNumber[productId] || {
      value: 0,
    };

    articlesNumber = productData.value || 1;

    productsByOrderInfo.push({
      _id: uuidv4(),
      productId,
      articlesNumber,
    });
  });

  return { productsByOrderInfo };
};
