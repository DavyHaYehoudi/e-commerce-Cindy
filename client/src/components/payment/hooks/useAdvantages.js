import { useDispatch, useSelector } from "react-redux";
import { Get, Post } from "../../../services/httpMethods";
import { updateAdvantages } from "../../../features/admin/productSlice";
import { toast } from "react-toastify";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { useState } from "react";

const useAdvantages = () => {
  const [promoCodeValue, setPromoCodeValue] = useState("");
  const [giftcardValue, setGiftcardValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const creditsStore = useSelector((state) => state?.customer?.data?.credit);
  const advantagesStore = useSelector((state) => state?.product?.advantages);
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();

  const handleOrderAmount = async () => {
    await Post(
      "orders/order-amount",
      advantagesStore,
      null,
      handleUnauthorized
    );
  };

  const handleCheckPromocode = async ({ code }) => {
    dispatch(updateAdvantages({ property: "codePromo" }));
    try {
      const response = await Get(
        `promocodes/verify-code?code=${code}`,
        null,
        handleUnauthorized
      );
      const percentage = response?.message;

      handleOrderAmount();

      dispatch(
        updateAdvantages({
          property: "codePromo",
          isValid: true,
          percentage,
          code,
        })
      );
      toast.success("Le code promo est bien pris en compte.");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };
  const handleCancelPromocode = ({ property }) => {
    dispatch(updateAdvantages({ property }));
    if (promoCodeValue) {
      toast.info("Le code promo n'est plus appliqué.");
    }
    setPromoCodeValue("");
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
      handleOrderAmount();
      dispatch(
        updateAdvantages({ property: "giftcard", isValid: true, amount, code })
      );
      toast.success("La carte cadeau est bien prise en compte.");
    } catch (error) {
      console.log("Erreur dans la vérification des avantages");
    }
  };
  const handleCancelGiftcard = ({ property }) => {
    dispatch(updateAdvantages({ property }));
    if (giftcardValue) {
      toast.info("La carte cadeau n'est plus appliquée.");
    }
    setGiftcardValue("");
  };

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const handleCreditApply = () => {
    handleOrderAmount();
    dispatch(updateAdvantages({ property: "credit", id: selectedValue }));
    if (selectedValue === "") {
      toast.info("L'avoir n'est plus appliqué.");
    } else {
      toast.success("L'avoir a bien été pris en compte.");
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
