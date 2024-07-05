import { useEffect, useState } from "react";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Post } from "../../../services/httpMethods";

const usePaymentClientSecret = (amount) => {
  const [clientSecret, setClientSecret] = useState("");
  const handleUnauthorized = useUnauthorizedRedirect();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await Post(
        "orders/create-payment-intent",
        { amount },
        null,
        handleUnauthorized 
      );
      setClientSecret(response?.clientSecret);
    };
    getClientSecret();
  }, [amount, handleUnauthorized]);

  return clientSecret;
};

export default usePaymentClientSecret;
