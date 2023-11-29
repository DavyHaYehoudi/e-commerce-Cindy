import { addAdminTrackingNumber } from "../../../../../../../features/admin/trackingNumberSlice";
import { v4 as uuidv4 } from "uuid";
import { articlesNumberCheck } from "./articlesNumberCheck";

export const handleValidate = (
  trackingInfo,
  setError,
  selectedProducts,
  setTrackingNumberBoxOpen,
  dispatch,
  clientId,
  orderId,
  articleNumber,
  setArticleNumber,
  setTrackingInfo,
  setSelectedProducts,
  setCheckboxStates,
  setChecking
) => {
  const { productsInfo } = articlesNumberCheck(selectedProducts, articleNumber);

  // if (selectedProducts.length === 0) {
  //   setError("⚠️ Veuillez cocher au moins une case.");
  //   return;
  // }
  setError(null);
  setTrackingNumberBoxOpen(false);
  const trackingNumberId = uuidv4();
  dispatch(
    addAdminTrackingNumber({
      clientId,
      orderId,
      trackingNumber: {
        id: trackingNumberId,
        isAdmin: true,
        value: trackingInfo.trackingField,
        date: trackingInfo.date,
        products: productsInfo,
      },
    })
  );

  setTrackingInfo({ trackingField: "", date: "" });
  setSelectedProducts([]);
  setCheckboxStates({});
  setArticleNumber({});
  setChecking({ quantity: false, number: false, date: false });
};

export const handleCancel = (
  setTrackingInfo,
  setSelectedProducts,
  setError,
  setCheckboxStates,
  setTrackingNumberBoxOpen,
  setArticleNumber,
  setChecking
) => {
  setTrackingInfo({ number: "", date: "" });
  setSelectedProducts([]);
  setError(null);
  setCheckboxStates({});
  setTrackingNumberBoxOpen(false);
  setArticleNumber({});
  setChecking({ quantity: false, number: false, date: false });
};
