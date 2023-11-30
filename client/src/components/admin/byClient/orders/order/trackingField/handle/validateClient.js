import { updatedClientTrackingNumber } from "../../../../../../../features/admin/trackingNumberSlice";
import { articlesNumberCheck } from "./articlesNumberCheck";

export const handleValidate = (
  item,
  setError,
  selectedProducts,
  articleNumber,
  dispatch,
  clientId,
  orderId,
  setSelectedProducts,
  setCheckboxStates,
  setArticleNumber,
  setIsEdited,
  setIsFormValid
) => {
  const { productsInfo } = articlesNumberCheck(selectedProducts, articleNumber);

  if (selectedProducts.length === 0) {
    setError("⚠️ Veuillez cocher au moins une case.");
    return;
  }
  dispatch(
    updatedClientTrackingNumber({
      clientId,
      orderId,
      trackingNumber: {
        id: item.id,
        products: productsInfo,
      },
    })
  );
  setError(null);
  setSelectedProducts([]);
  setCheckboxStates({});
  setIsEdited(false);
  setArticleNumber({});
  setIsFormValid(false);
};
export const handleCancel = (
  setSelectedProducts,
  setError,
  setCheckboxStates,
  setArticleNumber,
  setIsEdited,
  setIsFormValid
) => {
  setSelectedProducts([]);
  setError(null);
  setCheckboxStates({});
  setIsEdited(false);
  setArticleNumber({});
  setIsFormValid(false);
};
