import { useEffect } from "react";
import useAuthWrappers from "../../../config/useAuthWrappers";
import { toast } from "react-toastify";

const useAccessPayment = () => {
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  useEffect(() => {
    if (!clientId) {
      toast.info(
        "Penser à vous connecter à votre compte pour pouvoir bénéficier des avantages et passer commande."
      );
    }
    return
  }, [clientId]);

  return {clientId};
};
export default useAccessPayment;
