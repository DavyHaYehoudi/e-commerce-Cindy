import { useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Post } from "../../../services/httpMethods";
import useFormValidation from "./useFormValidation";

const useCreateOrder = async () => {
  const handleUnauthorized = useUnauthorizedRedirect();
  const customer = useSelector((state) => state?.customer?.data?.client);
  const advantages = useSelector((state) => state?.product?.advantages);
  const { _id, shippingAddress, billingAddress } = customer;
  const amountPromoCode = advantages?.codePromo?.percentage;
  const { formData } = useFormValidation();
  const isRememberMe = formData?.rememberMe;
  try {
    const formatData = {
      clientId: _id,
      shippingAddress,
      billingAddress,
      amountPromoCode,
      isRememberMe,
      advantages
    };
    await Post("orders", formatData, null, handleUnauthorized);
  } catch (error) {}
};
export default useCreateOrder;
