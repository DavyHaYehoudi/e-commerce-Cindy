import { addAdminTrackingNumber } from "../../../../../../../features/admin/trackingNumberSlice";
import { v4 as uuidv4 } from "uuid";

export const handleValidate = (
  trackingInfo,
  setError,
  selectedProducts,
  setTrackingNumberBoxOpen,
  articleNumberRefs,
  dispatch,
  clientId,
  orderId,
  setTrackingInfo,
  setSelectedProducts,
  setCheckboxStates
) => {
  if (!trackingInfo.number.trim()) {
    setError("⚠️ Le champ du numéro de suivi ne peut pas être vide.");
    return;
  }

  if (!trackingInfo.date) {
    setError("⚠️ Veuillez choisir une date d'envoi.");
    return;
  }
  if (selectedProducts.length === 0) {
    setError("⚠️ Veuillez cocher au moins une case.");
    return;
  }
  setError(null);
  setTrackingNumberBoxOpen(false);
  const trackingNumberId = uuidv4();
  let productsInfo = [];

  selectedProducts.forEach((productId) => {
    const articlesNumber = articleNumberRefs.current[productId]?.value || 1;

    productsInfo.push({
      id: uuidv4(),
      productId,
      articlesNumber,
    });
  });

  dispatch(
    addAdminTrackingNumber({
      clientId,
      orderId,
      trackingNumber: {
        id: trackingNumberId,
        isAdmin: true,
        value: trackingInfo.number,
        date: trackingInfo.date,
        products: productsInfo,
      },
    })
  );

  setTrackingInfo({ number: "", date: "" });
  setSelectedProducts([]);
  setCheckboxStates({});
  Object.values(articleNumberRefs.current).forEach((ref) => {
    if (ref) {
      ref.value = "";
    }
  });
};

export const handleCancel = (
  setTrackingInfo,
  setSelectedProducts,
  setError,
  setCheckboxStates,
  setTrackingNumberBoxOpen,
  articleNumberRefs
) => {
  setTrackingInfo({ number: "", date: "" });
  setSelectedProducts([]);
  setError(null);
  setCheckboxStates({});
  setTrackingNumberBoxOpen(false);
  Object.values(articleNumberRefs.current).forEach((ref) => {
    if (ref) {
      ref.value = "";
    }
  });
};


