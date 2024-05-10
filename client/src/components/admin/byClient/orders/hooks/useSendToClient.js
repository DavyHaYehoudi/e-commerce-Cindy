import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { sendToClientSuccess } from "../../../../../features/admin/ordersSlice";
import { toast } from "react-toastify";
import { Patch } from "../../../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../../../services/errors/useUnauthorizedRedirect";
import { handleFetchError } from "../../../../../services/errors/handleFetchError";

const useSendToClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const sendToClient = useCallback(
    async (orderId, orderProductsReqBody, orderReqBody) => {
      const requestBody = [orderProductsReqBody, orderReqBody];
      try {
        setLoading(true);
        const response = await Patch(
          `orders/${orderId}`,
          requestBody,
          null,
          handleUnauthorized
        );
        const { lastSentDateToClient } = response;
        dispatch(sendToClientSuccess({ orderId, lastSentDateToClient }));
        toast.success("Les informations ont bien été partagées au client !");
        setError(null);
      } catch (error) {
        handleFetchError(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, handleUnauthorized]
  );

  return { sendToClient, loading, error };
};

export default useSendToClient;
