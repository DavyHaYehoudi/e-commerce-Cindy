import { useDispatch } from "react-redux";
import { Get } from "../../../services/httpMethods";
import { updateAdvantages } from "../../../features/admin/productSlice";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";

const useAdvantages = () => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const handleCheckPromocode = async ({ property, code }) => {
    dispatch(updateAdvantages({ property }));
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
  const handleCancelPromocode=({property})=>{
    dispatch(updateAdvantages({ property }));
    toast.success("Le code promo n'est plus appliqué.");
  }
  return { handleCheckPromocode,handleCancelPromocode };
};
export default useAdvantages;
