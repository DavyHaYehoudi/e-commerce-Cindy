import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStoreInfo from "../../../shared/hooks/useStoreInfo";

const useInventoryAdvantages = () => {
  const [intermediateAmounts, setIntermediateAmounts] = useState({});
  const { codePromo, giftcard, credit } = useSelector(
    (state) => state?.product?.advantages
  );
  const { cartTotalAmount } = useStoreInfo({
    productsId: "",
    material: "",
  });

  useEffect(() => {
    let totalAmount = cartTotalAmount;
    const newIntermediateAmounts = {};

    // Appliquer la réduction du code promo
    if (codePromo && codePromo.percentage) {
      const discount = (totalAmount * codePromo.percentage) / 100;
      totalAmount -= discount;
      newIntermediateAmounts.codePromo = totalAmount;
    }

    // Appliquer la réduction de la carte cadeau
    if (giftcard && giftcard.amount) {
      totalAmount -= giftcard.amount;
      newIntermediateAmounts.giftcard = totalAmount;
    }

    // Appliquer la réduction du crédit
    if (credit && credit.amount) {
      totalAmount -= credit.amount;
      newIntermediateAmounts.credit = totalAmount;
    }

    setIntermediateAmounts(newIntermediateAmounts);
  }, [codePromo, giftcard, credit, cartTotalAmount]);

  return { intermediateAmounts, cartTotalAmount, codePromo, giftcard, credit };
};

export default useInventoryAdvantages;
