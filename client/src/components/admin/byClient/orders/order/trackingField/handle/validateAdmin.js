import { addAdminTrackingNumber } from "../../../../../../../features/admin/ordersSlice";
import { v4 as uuidv4 } from "uuid";
import { articlesNumberCheck } from "./articlesNumberCheck";

export const handleValidate = (
  trackingInfo,
  setError,
  selectedProducts,
  setTrackingNumberBoxOpen,
  dispatch,
  orderId,
  articleNumber,
  setArticleNumber,
  setTrackingInfo,
  setSelectedProducts,
  setCheckboxStates,
  setIsFormValid
) => {
  const { trackingField, date } = trackingInfo;
  if (!trackingField.trim()) {
    setError("⚠️ Veuillez définir un numéro de suivi.");
    return;
  }
  if (!date) {
    setError("⚠️ Veuillez choisir une date d'envoi.");
    return;
  }

  const { productsInfo } = articlesNumberCheck(selectedProducts, articleNumber);

  setError(null);
  setTrackingNumberBoxOpen(false);
  const trackingNumberId = uuidv4();
  dispatch(
    addAdminTrackingNumber({
      orderId,
      trackingNumber: {
        id: trackingNumberId,
        isAdmin: true,
        value: trackingField,
        date: date,
        products: productsInfo,
      },
    })
  );

  setTrackingInfo({ trackingField: "", date: "" });
  setSelectedProducts([]);
  setCheckboxStates({});
  setArticleNumber({});
  setIsFormValid(false);
};

export const handleCancel = (
  setTrackingInfo,
  setSelectedProducts,
  setError,
  setCheckboxStates,
  setTrackingNumberBoxOpen,
  setArticleNumber,
  setIsFormValid
) => {
  setTrackingInfo({ trackingField: "", date: "" });
  setSelectedProducts([]);
  setError(null);
  setCheckboxStates({});
  setTrackingNumberBoxOpen(false);
  setArticleNumber({});
  setIsFormValid(false);
};
