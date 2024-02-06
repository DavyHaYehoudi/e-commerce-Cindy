import { useState } from "react";
import { updateOrder } from "../../../../../../../features/admin/ordersSlice";
import { articlesNumberCheck } from "../handle/articlesNumberCheck";
import { useDispatch } from "react-redux";

const useAdminTrackingNumberCreate = ({
  setError,
  setSelectedProducts,
  setCheckboxStates,
  setTrackingInfo,
  setTrackingNumberBoxOpen,
  setIsFormValid,
}) => {
  const dispatch = useDispatch();
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

    const { productsByOrderInfo } = articlesNumberCheck(
      selectedProducts,
      articleNumber
    );

    dispatch(
      updateOrder({
        orderId,
        actionType: "trackingNumberAddAdmin",
        trackingNumber: {
          isAdmin: true,
          value: trackingField,
          date: date,
          productsByOrder: productsByOrderInfo,
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
