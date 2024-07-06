import { useEffect, useState } from "react";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Post } from "../../../services/httpMethods";
import { useSelector } from "react-redux";

const usePaymentClientSecret = (amount) => {
  const [clientSecret, setClientSecret] = useState("");
  const handleUnauthorized = useUnauthorizedRedirect();
  const email = useSelector((state) => state?.customer?.data?.client?.email);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await Post(
        "orders/create-payment-intent",
        { amount, email },
        null,
        handleUnauthorized
      );
      setClientSecret(response?.clientSecret);
    };
    getClientSecret();
  }, [amount, handleUnauthorized, email]);

  return clientSecret;
};

export default usePaymentClientSecret;
