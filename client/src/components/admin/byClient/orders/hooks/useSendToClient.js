import { useState, useCallback } from "react";
import { customFetch } from "../../../../../services/customFetch";
import { useDispatch } from "react-redux";
import { sendToClientSuccess } from "../../../../../features/admin/ordersSlice";
import { toast } from "react-toastify";

const useSendToClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const sendToClient = useCallback(
    async (orderId, orderProductsReqBody, orderReqBody) => {
      const requestBody = [orderProductsReqBody, orderReqBody];
      try {
        setLoading(true);

        const response = await customFetch(`orders/${orderId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(requestBody),
        });
        if (response) {
          const { lastSentDateToClient } = response;
          dispatch(sendToClientSuccess({ orderId, lastSentDateToClient }));
          toast.success("Les informations ont bien été partagées au client !");
        }

        setError(null);
      } catch (error) {
        if (error.message.includes("Status: 400")) {
          toast.error(
            "Une erreur est survenue avec les informations fournies."
          );
        }
        if (error.message.includes("Status: 500")) {
          toast.error("Une erreur est survenue avec le réseau ou le serveur.");
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { sendToClient, loading, error };
};

export default useSendToClient;
