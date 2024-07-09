import { useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Patch, Post } from "../../../services/httpMethods";
import useFormValidation from "./useFormValidation";

const useCreateOrder = () => {
  const handleUnauthorized = useUnauthorizedRedirect();
  const customer = useSelector((state) => state?.customer?.data?.client);
  const advantages = useSelector((state) => state?.product?.advantages);
  const { _id, shippingAddress, billingAddress } = customer || {};
  const { formData } = useFormValidation();
  const isRememberMe = formData?.rememberMe;

  const handleCreateOrder = async () => {
    try {
      const formatData = {
        clientId: _id,
        isRememberMe,
        advantages,
        shippingAddress,
        billingAddress,
      };
      const response = await Post(
        "orders",
        formatData,
        null,
        handleUnauthorized
      );
      return { orderNumber: response?.orderNumber };
    } catch (error) {
      console.log("Erreur dans handleCreateOrder :", error);
    }
  };
  const handleOrderConfirm = async (orderNumber) => {
    try {
      await Patch("orders", { orderNumber }, null, handleUnauthorized);
    } catch (error) {
      console.log("Erreur dans handleOrderConfirm :", error);
    }
  };
  return { handleCreateOrder, handleOrderConfirm };
};
export default useCreateOrder;
