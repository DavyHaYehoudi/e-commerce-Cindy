import { v4 as uuidv4 } from "uuid";
export const articlesNumberCheck = (selectedProducts, articleNumber) => {
  let productsInfo = [];
  let articlesNumber;
  let articlesNumberMax;
  let articlesNumberMaxExceed = false;

  selectedProducts.forEach((productId) => {
    const productData = articleNumber[productId] || {
      value: 0,
      articlesNumberMax: 1,
    };

    articlesNumber = productData.value || 1;
    articlesNumberMax = productData.articlesNumberMax || 1;

    productsInfo.push({
      id: uuidv4(),
      productId,
      articlesNumber,
    });
  });

  if (articlesNumber > articlesNumberMax) {
    articlesNumberMaxExceed = true;
  }

  return { productsInfo, articlesNumberMaxExceed, articlesNumberMax };
};
