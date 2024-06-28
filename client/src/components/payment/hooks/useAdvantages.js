import { useDispatch, useSelector } from "react-redux";
import { Get } from "../../../services/httpMethods";
import {
  updateAdvantages,
  updateCartAmount,
} from "../../../features/admin/productSlice";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { useState } from "react";
import useAuthWrappers from "../../../config/useAuthWrappers";

const useAdvantages = () => {
  const [promoCodeValue, setPromoCodeValue] = useState("");
  const [giftcardValue, setGiftcardValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const creditsStore = useSelector((state) => state?.customer?.data?.credit);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();

  let formParams = useSelector((state) => state?.product?.advantages);

  const handleOrderAmount = async (params) => {
    formParams = { ...formParams, ...params };
    if (!clientId) {
      return;
    }
    const queryString = new URLSearchParams({
      clientId,
      advantages: JSON.stringify(formParams),
    }).toString();
    const newAmount = await Get(
      `orders/order-amount?${queryString}`,
      null,
      handleUnauthorized
    );
    return newAmount;
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
      const cartAmountEvaluate = await handleOrderAmount({
        codePromo: { isValid: true, percentage, code },
      });
      const newAmount = cartAmountEvaluate?.totalAmount;
      dispatch(updateCartAmount(newAmount));

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
      const cartAmountEvaluate = await handleOrderAmount({
        codePromo: { isValid: false },
      });
      const newAmount = cartAmountEvaluate?.totalAmount;
      dispatch(updateCartAmount(newAmount));
      if (promoCodeValue) {
        toast.info("Le code promo n'est plus appliqué.");
      }
      setPromoCodeValue("");
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

      const cartAmountEvaluate = await handleOrderAmount({
        giftcard: { isValid: true, code },
      });
      const newAmount = cartAmountEvaluate?.totalAmount;
      dispatch(updateCartAmount(newAmount));
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

      const cartAmountEvaluate = await handleOrderAmount({
        giftcard: { isValid: false },
      });
      const newAmount = cartAmountEvaluate?.totalAmount;
      dispatch(updateCartAmount(newAmount));
      if (giftcardValue) {
        toast.info("La carte cadeau n'est plus appliquée.");
      }
      setGiftcardValue("");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleCreditApply = async () => {
    if (selectedValue === "") {
      return;
    }
    if (selectedValue === "none") {
      dispatch(
        updateAdvantages({
          property: "credit",
          creditId: selectedValue,
          amount: "",
        })
      );
      const cartAmountEvaluate = await handleOrderAmount({
        credit: { isValid: false },
      });
      const newAmount = cartAmountEvaluate?.totalAmount;
      dispatch(updateCartAmount(newAmount));
      toast.info("L'avoir n'est plus appliqué.");
    }
    if (selectedValue && selectedValue !== "none") {
      const response = await Get(
        `credits/verify-code?creditId=${selectedValue}&clientId=${clientId}`,
        null,
        handleUnauthorized
      );
      const { amount } = response;

      dispatch(
        updateAdvantages({
          property: "credit",
          creditId: selectedValue,
          amount,
          isValid: true,
          clientId,
        })
      );
      const cartAmountEvaluate = await handleOrderAmount({
        credit: { isValid: true, creditId: selectedValue, clientId },
      });
      const newAmount = cartAmountEvaluate?.totalAmount;
      dispatch(updateCartAmount(newAmount));
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
      handleCreditApply();
    }
  };

  return {
    promoCodeValue,
    setPromoCodeValue,
    giftcardValue,
    setGiftcardValue,
    creditsStore,
    selectedValue,
    handleCheckPromocode,
    handleCancelPromocode,
    handleCheckGiftcard,
    handleCancelGiftcard,
    handleKeyPressGiftcard,
    handleKeyPressPromocode,
    handleSelectChange,
    handleCreditApply,
    handleKeyPressCredit,
  };
};
export default useAdvantages;
