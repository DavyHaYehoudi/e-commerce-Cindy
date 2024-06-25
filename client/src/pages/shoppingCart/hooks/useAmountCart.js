import { useEffect, useState } from "react";
import useAuthWrappers from "../../../config/useAuthWrappers";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { Get } from "../../../services/httpMethods";

const useAmountCart = () => {
  const [ cartAmount, setCartAmount ] = useState(0);
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
        setCartAmount(response?.totalAmount);
      };
      fetchTotalAmount();
    } catch (error) {
      console.log("Erreur dans la récupération du total du panier :", error);
    }
  }, [clientId, handleUnauthorized, setCartAmount]);
  return { cartAmount };
};
export default useAmountCart;
