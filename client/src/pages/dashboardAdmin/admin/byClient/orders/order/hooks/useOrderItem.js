import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getOrderInfo,
  getTrackingNumberList,
} from "../../../../../../../selectors/order";
import useSendToClient from "../../hooks/useSendToClient";

const useOrderItem = (order, step) => {
  const { orderProducts } = useSelector((state) =>
    getOrderInfo(state, order._id)
  );
  const orderProductsStore = useSelector((state) => state?.orderProducts?.data);
  const creditStore = useSelector((state) => state?.credit?.data);
  const trackingNumberList = useSelector((state) =>
    getTrackingNumberList(state, order?._id)
  );

  const { sendToClient, loading } = useSendToClient();

  const handleSendToClient = (isClientNotNotified) => {
    if (!isClientNotNotified) {
      return toast.info("Aucune modification n'a été apportée.");
    }

    const orderProductsReqBody = [];
    const orderReqBody = {};

    orderProducts.forEach((orderProductsId) => {
      const resultMap = {};

      const matchingObject = orderProductsStore.find(
        (item) => item._id === orderProductsId
      );
      if (matchingObject) {
        resultMap["orderProducts"] = matchingObject;
      }

      const creditMatchingObject = creditStore.find(
        (item) => item.orderProductsId === orderProductsId
      );
      if (creditMatchingObject) {
        resultMap["creditEdit"] = creditMatchingObject;
      }

      orderProductsReqBody.push(resultMap);
    });

    orderReqBody["trackingNumberList"] = trackingNumberList;
    orderReqBody["step"] = step;

    sendToClient(order?._id, orderProductsReqBody, orderReqBody);
  };

  return {
    orderProducts,
    trackingNumberList,
    loading,
    handleSendToClient,
  };
};

export default useOrderItem;
