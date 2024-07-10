import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../../../../services/errors/useUnauthorizedRedirect";
import { deleteTrackingNumber } from "../../../../../../features/accountClient/customerSlice";
import { getProductProperties } from "../../../../../../selectors/product";
import { getMaterialProperty } from "../../../../../../selectors/material";

const useTrackingNumberDetails = (trk, order) => {
  const [isTrashConfirm, setIsTrashConfirm] = useState(false);
  const productStore = useSelector((state) => state?.product?.data);
  const collectionStore = useSelector((state) => state?.collection?.data);
  const categoryStore = useSelector((state) => state?.category?.data);
  const tagStore = useSelector((state) => state?.tag?.data);
  const materialStore = useSelector((state) => state?.material?.data);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const handleConfirmCancel = (trackingNumberId) => {
    const orderId = order._id;
    dispatch(
      deleteTrackingNumber({
        orderId,
        trackingNumberId,
        handleUnauthorized,
      })
    );
  };

  const productProperties = trk?.orderProducts?.map((item) => ({
    name: getProductProperties(
      item.productsId,
      productStore,
      collectionStore,
      categoryStore,
      tagStore,
      materialStore
    )?.name,
    materialName: getMaterialProperty(item?.material, materialStore)?.name,
    articlesNumber: item?.articlesNumber,
  })) || [];
  

  return {
    isTrashConfirm,
    setIsTrashConfirm,
    handleConfirmCancel,
    productProperties,
  };
};

export default useTrackingNumberDetails;
