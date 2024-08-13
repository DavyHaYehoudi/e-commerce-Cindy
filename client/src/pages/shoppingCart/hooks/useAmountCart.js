import { useCallback, useEffect, useRef } from "react";
import useAuthWrappers from "../../../config/useAuthWrappers";
import { Get } from "../../../services/httpMethods";
import { useDispatch, useSelector } from "react-redux";
import { updateCartAmount } from "../../../features/admin/productSlice";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";

const useAmountCart = () => {
  const cartAmount = useSelector((state) => state?.product?.cartAmount);
  const formParamsRef = useRef(
    useSelector((state) => state?.product?.advantages)
  );

  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();

  const fetchTotalAmount = useCallback(
    async ({ params = {} }) => {
      let isMounted = true;

      try {
        formParamsRef.current = { ...formParamsRef.current, ...params };
        const queryString = new URLSearchParams({
          clientId,
          advantages: JSON.stringify(formParamsRef.current),
        }).toString();

        const { totalAmount } = await Get(
          `orders/order-amount?${queryString}`,
          null,
          handleUnauthorized
        );

        if (isMounted) {
          // Vérifie si le composant est toujours monté
          dispatch(updateCartAmount(totalAmount));
        }
      } catch (error) {
        if (isMounted) {
          // Seulement loguer l'erreur si monté
          console.log("Erreur dans fetchTotalAmount :", error);
        }
      }

      return () => {
        isMounted = false; // Définit la variable sur false lors du démontage
      };
    },
    [clientId, dispatch, handleUnauthorized]
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

  return { cartAmount, fetchTotalAmount };
};

export default useAmountCart;
