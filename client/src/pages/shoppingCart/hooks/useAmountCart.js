import { useCallback, useEffect, useRef } from "react";
import useAuthWrappers from "../../../config/useAuthWrappers";
import { Get } from "../../../services/httpMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAmount } from "../../../features/admin/productSlice";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";

const useAmountCart = () => {
  const cartAmount = useSelector((state) => state?.product?.cartAmount);
  const { codePromo, giftcard, credit } =
    useSelector((state) => state?.product?.advantages) || {};
  const formParamsRef = useRef(
    useSelector((state) => state?.product?.advantages)
  );

  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();

  const fetchTotalAmount = useCallback(
    async ({ params = {},advantage=null }) => {
      formParamsRef.current = { ...formParamsRef.current, ...params };
      const queryString = new URLSearchParams({
        clientId,
        advantages: JSON.stringify(formParamsRef.current),
      }).toString();

      let {totalAmount} = await Get(
        `orders/order-amount?${queryString}`,
        null,
        handleUnauthorized
      );

      if (codePromo?.code&&advantage==="codePromo") {
        totalAmount -= (totalAmount * codePromo?.percentage) / 100;
      }

      if (giftcard?.code&&advantage==="giftcard") {
        totalAmount -= giftcard?.amount;
      }

      if (credit?.creditId&&advantage==="credit") {
        totalAmount -= credit?.amount;
      }

      dispatch(updateCartAmount(totalAmount));
    },
    [clientId, codePromo, giftcard, credit, dispatch, handleUnauthorized]
  );

  useEffect(() => {
    try {
      if (!clientId) {
        return;
      }
      fetchTotalAmount({});
    } catch (error) {
      console.log("Erreur dans la récupération du total du panier :", error);
    }
  }, [clientId, fetchTotalAmount]);

  return {cartAmount,fetchTotalAmount};
};

export default useAmountCart;
