import { v4 as uuidv4 } from "uuid";

export const articlesNumberCheck = (selectedProducts, articleNumber) => {
  let orderProductsInfo = [];

  const selectedProductsArray = Object.entries(selectedProducts);

  selectedProductsArray.forEach(([combinedId, value]) => {
    const { productsId, material, _id } = value;

    const productData = articleNumber[combinedId] || { value: 0 };
    const articlesNumber = productData.value || 1;

    orderProductsInfo.push({
      id: uuidv4(),
      productsId,
      articlesNumber,
      material,
      orderProductsId: _id,
    });
  });

  return { orderProductsInfo };
};
