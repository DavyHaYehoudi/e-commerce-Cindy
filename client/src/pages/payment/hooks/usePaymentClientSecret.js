import { useEffect, useState } from "react";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Post } from "../../../services/httpMethods";
import { useSelector } from "react-redux";
import useAuthWrappers from "../../../config/useAuthWrappers";

const usePaymentClientSecret = () => {
  const [clientSecret, setClientSecret] = useState("");
  const handleUnauthorized = useUnauthorizedRedirect();
  const email = useSelector((state) => state?.customer?.data?.client?.email);
  const advantages = useSelector((state) => state?.product?.advantages);
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await Post(
        "orders/create-payment-intent",
        { email, advantages, clientId },
        null,
        handleUnauthorized
      );
      setClientSecret(response?.clientSecret);
    };
    getClientSecret();
  }, [handleUnauthorized, email, advantages, clientId]);

  return clientSecret;
};

export default usePaymentClientSecret; 
