import { useState, useCallback } from "react";
import { customFetch } from "../../../../../helpers/services/customFetch";

const useSendToClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendToClient = useCallback(async (orderId,requestBody) => {
    try {
      setLoading(true);

      const response = await customFetch(`order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setError(null); // Réinitialisez les erreurs s'il y en a eu précédemment
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendToClient, loading, error };
};

export default useSendToClient;
