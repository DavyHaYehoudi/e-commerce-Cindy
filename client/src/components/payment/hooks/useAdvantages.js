import { useDispatch, useSelector } from "react-redux";
import { Get } from "../../../services/httpMethods";
import { updateAdvantages } from "../../../features/admin/productSlice";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import useAuthWrappers from "../../../config/useAuthWrappers";
import useAmountCart from "../../../pages/shoppingCart/hooks/useAmountCart";

const useAdvantages = () => {
  const creditsStore = useSelector((state) => state?.customer?.data?.credit);
  const { codePromo, giftcard } =
    useSelector((state) => state?.product?.advantages) || {};
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const { fetchTotalAmount } = useAmountCart();

  const handleAdvantagesValue = ({ property, value }) => {
    dispatch(updateAdvantages({ property, code: value }));
  };
  const handleCheckPromocode = async ({ code }) => {
    dispatch(updateAdvantages({ property: "codePromo" }));
    try {
      const response = await Get(
        `promocodes/verify-code?code=${code}`,
        null,
        handleUnauthorized
      );
      const { percentage } = response;

      dispatch(
        updateAdvantages({
          property: "codePromo",
          isValid: true,
          percentage,
          code,
        })
      );
      await fetchTotalAmount({
        params: {
          codePromo: { isValid: true, code },
          advantage: "codePromo",
        },
      });
      toast.success("Le code promo est bien pris en compte.");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  }; 
  const handleCancelPromocode = async ({ property }) => {
    dispatch(updateAdvantages({ property }));

    try {
      dispatch(
        updateAdvantages({
          property: "codePromo",
          isValid: false,
          percentage: "",
          code: "",
        })
      );
      await fetchTotalAmount({
        params: {
          codePromo: { isValid: false },
        },
      });
      if (codePromo?.code) {
        toast.info("Le code promo n'est plus appliqué.");
      }
    } catch (error) {
      console.log("Erreur dans l'annulation des avantages");
    }
  };
  const handleCheckGiftcard = async ({ code }) => {
    dispatch(updateAdvantages({ property: "giftcard" }));
    try {
      const response = await Get(
        `giftcards/verify-code?code=${code}`,
        null,
        handleUnauthorized
      );
      const { amount } = response;
      dispatch(
        updateAdvantages({ property: "giftcard", isValid: true, amount, code })
      );

      await fetchTotalAmount({
        params: {
          giftcard: { isValid: true, code },
        },
        advantage: "giftcard",
      });
      toast.success("La carte cadeau est bien prise en compte.");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };
  const handleCancelGiftcard = async ({ property }) => {
    dispatch(updateAdvantages({ property }));

    try {
      dispatch(
        updateAdvantages({
          property: "giftcard",
          isValid: false,
          amount: "",
          code: "",
        })
      );

      await fetchTotalAmount({
        params: {
          giftcard: { isValid: false },
        },
      });
      if (giftcard?.code) {
        toast.info("La carte cadeau n'est plus appliquée.");
      }
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };
  const handleCreditChange = async (creditId) => {
    dispatch(updateAdvantages({ creditId }));
    if (creditId === "none") {
      dispatch(
        updateAdvantages({
          property: "credit",
          creditId,
          amount: "",
        })
      );
      await fetchTotalAmount({
        params: {
          credit: { isValid: false },
        },
      });
      toast.info("L'avoir n'est plus appliqué.");
    }
    if (creditId && creditId !== "none") {
      const response = await Get(
        `credits/verify-code?creditId=${creditId}&clientId=${clientId}`,
        null,
        handleUnauthorized
      );
      const { amount } = response;
      dispatch(
        updateAdvantages({
          property: "credit",
          creditId,
          amount,
          isValid: true,
          clientId,
        })
      );

      await fetchTotalAmount({
        params: {
          credit: { isValid: true, creditId, clientId },
        },
        advantage: "credit",
      });
      toast.success("L'avoir est bien pris en compte.");
    }
  };
  const handleKeyPressGiftcard = ({ event, code }) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheckGiftcard({ property: "giftcard", code });
    }
  };
  const handleKeyPressPromocode = ({ event, code }) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheckPromocode({
        property: "codePromo",
        code,
      });
    }
  };
  const handleKeyPressCredit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreditChange();
    }
  };

  return {
    creditsStore,
    handleCheckPromocode,
    handleCancelPromocode,
    handleCheckGiftcard,
    handleCancelGiftcard,
    handleKeyPressGiftcard,
    handleKeyPressPromocode,
    handleCreditChange,
    handleKeyPressCredit,
    handleAdvantagesValue,
  };
};
export default useAdvantages;
