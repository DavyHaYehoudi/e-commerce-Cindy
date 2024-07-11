import { useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Patch, Post } from "../../../services/httpMethods";

const useCreateOrder = () => {
  const handleUnauthorized = useUnauthorizedRedirect();
  const customer = useSelector((state) => state?.customer?.data?.client);
  const advantages = useSelector((state) => state?.product?.advantages);
  const { _id, shippingAddress, billingAddress, email } = customer || {};
  const isRememberMe = useSelector((state) => state?.product?.isRememberMe);
  const isBillingSameAddress = useSelector(
    (state) => state?.product?.isBillingSameAddress
  );
  const witchBillingAddress = isBillingSameAddress
    ? shippingAddress
    : billingAddress;

  const handleCreateOrder = async () => {
    try {
      const formatData = {
        clientId: _id,
        isRememberMe,
        advantages,
        shippingAddress,
        billingAddress: witchBillingAddress,
      };
      const response = await Post(
        "orders",
        formatData,
        null,
        handleUnauthorized
      );
      const orderNumber = response?.orderNumber;

      const orderDataConfirm = {
        clientId: _id,
        isRememberMe,
        advantages,
        shippingAddress,
        billingAddress: witchBillingAddress,
        orderNumber,
        email,
      };
      localStorage.setItem(
        "orderDataConfirm",
        JSON.stringify(orderDataConfirm)
      );

      return { orderNumber };
    } catch (error) {
      console.log("Erreur dans handleCreateOrder :", error);
    }
  };
  const handleOrderConfirm = async (parsedOrderData) => {
    try {
      await Patch("orders", parsedOrderData, null, handleUnauthorized);
    } catch (error) {
      console.log("Erreur dans handleOrderConfirm :", error);
    }
  };
  return { handleCreateOrder, handleOrderConfirm };
};
export default useCreateOrder;
