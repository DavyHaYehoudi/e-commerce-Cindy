import { useState } from "react";
import { addAdminTrackingNumber } from "../../../../../../../features/admin/ordersSlice";
import { v4 as uuidv4 } from "uuid";
import { articlesNumberCheck } from "../handle/articlesNumberCheck";

const useAdminTrackingNumberCreate = ({
  dispatch,
  setError,
  setSelectedProducts,
  setCheckboxStates,
  setTrackingInfo,
  setTrackingNumberBoxOpen,
  setIsFormValid,
}) => {
  const [articleNumber, setArticleNumber] = useState({});

  const handleValidate = (
    trackingInfo,
    selectedProducts,
    orderId,
    articleNumber
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

    const { productsInfo } = articlesNumberCheck(
      selectedProducts,
      articleNumber
    );

    dispatch(
      addAdminTrackingNumber({
        orderId,
        trackingNumber: {
          id: uuidv4(),
          isAdmin: true,
          value: trackingField,
          date: date,
          products: productsInfo,
        },
      })
    );

    setError(null);
    setTrackingNumberBoxOpen(false);
    setTrackingInfo({ trackingField: "", date: "" });
    setSelectedProducts([]);
    setCheckboxStates({});
    setArticleNumber({});
    setIsFormValid(false);
  };

  const handleCancel = () => {
    setTrackingInfo({ trackingField: "", date: "" });
    setSelectedProducts([]);
    setError(null);
    setCheckboxStates({});
    setTrackingNumberBoxOpen(false);
    setArticleNumber({});
    setIsFormValid(false);
  };

  return {
    articleNumber,
    setArticleNumber,
    handleValidate,
    handleCancel,
  };
};

export default useAdminTrackingNumberCreate;
