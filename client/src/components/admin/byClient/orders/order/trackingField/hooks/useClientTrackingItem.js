import { useState } from "react";
import { updatedClientTrackingNumber } from "../../../../../../../features/admin/ordersSlice";
import { articlesNumberCheck } from "../handle/articlesNumberCheck";
import { useDispatch } from "react-redux";

const useClientTrackingItem = ({
  setError,
  setSelectedProducts,
  setCheckboxStates,
  setIsFormValid,
}) => {
  const [articleNumber, setArticleNumber] = useState({});
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const handleValidate = (item, selectedProducts, articleNumber, orderId) => {
    const { productsByOrderInfo } = articlesNumberCheck(
      selectedProducts,
      articleNumber
    );

    if (selectedProducts.length === 0) {
      setError("⚠️ Veuillez cocher au moins une case.");
      return;
    }

    dispatch(
      updatedClientTrackingNumber({
        orderId,
        trackingNumber: {
          id: item.id,
          productsByOrder: productsByOrderInfo,
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

  const handleCancel = () => {
    setSelectedProducts([]);
    setError(null);
    setCheckboxStates({});
    setIsEdited(false);
    setArticleNumber({});
    setIsFormValid(false);
  };

  return {
    articleNumber,
    setArticleNumber,
    setIsEdited,
    isEdited,
    handleValidate,
    handleCancel,
  };
};

export default useClientTrackingItem;
