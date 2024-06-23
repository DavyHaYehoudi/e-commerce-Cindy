import { useDispatch } from "react-redux";
import { Get } from "../../../services/httpMethods";
import { updateAdvantages } from "../../../features/admin/productSlice";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";

const useAdvantages = () => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
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
        updateAdvantages({ property: "codePromo", isValid: true, percentage })
      );
      toast.success("Le code promo est bien pris en compte.");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };
  const handleCancelPromocode = ({ property }) => {
    dispatch(updateAdvantages({ property }));
    toast.info("Le code promo n'est plus appliqué.");
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
        updateAdvantages({ property: "giftcard", isValid: true, amount })
      );
      toast.success("La carte cadeau est bien prise en compte.");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };
  const handleCancelGiftcard = ({ property }) => {
    dispatch(updateAdvantages({ property }));
    toast.info("La carte cadeau n'est plus appliquée.");
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

  return {
    handleCheckPromocode,
    handleCancelPromocode,
    handleCheckGiftcard,
    handleCancelGiftcard,
    handleKeyPressGiftcard,
    handleKeyPressPromocode,
  };
};
export default useAdvantages;
