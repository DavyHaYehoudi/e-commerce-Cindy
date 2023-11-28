import {updatedClientTrackingNumber } from "../../../../../../../features/admin/trackingNumberSlice";
import { v4 as uuidv4 } from "uuid";

export const handleValidate = (
    item,
    setError,
    selectedProducts,
    articleNumber,
    dispatch,
    clientId,
    orderId,
    setSelectedProducts,
    setCheckboxStates
  ) => {
    setError(null);
    let productsInfo = [];
  
    selectedProducts.forEach((productId) => {
        // articleNumber&&(articleNumber[product.productId]||1)
      const articlesNumber = articleNumber[productId] || 1;
  
      productsInfo.push({
        id: uuidv4(),
        productId,
        articlesNumber,
      });
    });
    dispatch(
      updatedClientTrackingNumber({
        clientId,
        orderId,
        trackingNumber: {
          id:item.id,
          products: productsInfo,
        },
      })
    );
    setSelectedProducts([]);
    setCheckboxStates({});
    // Object.values(articleNumberRefs.current).forEach((ref) => {
    //   if (ref) {
    //     ref.value = "";
    //   }
    // });
  };
  export const handleCancel = () => {};