import { useEffect } from "react";
import useAuthWrappers from "../../../config/useAuthWrappers";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Get } from "../../../services/httpMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAmount } from "../../../features/admin/productSlice";

const useAmountCart = () => {
  const cartAmount = useSelector((state) => state?.product?.cartAmount);

  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  useEffect(() => {
    try {
      const fetchTotalAmount = async () => {
        const response = await Get(
          `orders/order-amount?clientId=${clientId}`,
          null,
          handleUnauthorized
        );
        dispatch(updateCartAmount(response?.totalAmount));
      };
      fetchTotalAmount();
    } catch (error) {
      console.log("Erreur dans la récupération du total du panier :", error);
    }
  }, [clientId, handleUnauthorized, dispatch]);
  return cartAmount;
};
export default useAmountCart;
