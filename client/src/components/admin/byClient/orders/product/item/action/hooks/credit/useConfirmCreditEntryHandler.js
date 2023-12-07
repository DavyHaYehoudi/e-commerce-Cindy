// Bouton de validation du champ de l'avoir
import { useDispatch } from "react-redux";
import { addCredit } from "../../../../../../../../../features/admin/creditsSlice";
import { totalsInOut,articleAction } from "../../../../../../../../../features/admin/ordersSlice";
import { updateActionContent } from "../../../../../../../../../features/admin/productsSlice";

export const useConfirmCreditEntryHandler = () => {
  const dispatch = useDispatch();

  const handleConfirmCreditEntry = (
    e,
    action,
    productsActions,
    setProductActions,
    setEntryError,
    clientId,
    productId,
    orderId,
    products,
    productPrice
  ) => {
    e.stopPropagation();
    let { amount, dateExpire } = productsActions.creditContent;
    amount = parseInt(amount);
    const selectedDate = new Date(dateExpire);
    const currentDate = new Date();
    const validityDate = selectedDate > currentDate;

    if (!amount > 0 || !validityDate) {
      if (!amount > 0 && !validityDate) {
        setEntryError(
          "⚠️ Le montant de l'avoir et une date de validité ultérieure doivent être définis."
        );
      } else if (!amount > 0 && validityDate) {
        setEntryError("⚠️ Un montant doit être défini.");
      } else if (amount > 0 && !validityDate) {
        setEntryError("⚠️ Une date ultérieure doit être définie.");
      }
    } else if (amount > 0 && validityDate) {
      dispatch(
        addCredit({
          productsId: products.id,
          amount: productsActions.creditContent.amount,
          dateExpire: productsActions.creditContent?.dateExpire,
        })
      );
      dispatch(
        updateActionContent({
          creditContent: products.id,
          productId,
          updatedProperty: action,
          isClientNotified: false,
        })
      );

      dispatch(
        totalsInOut({
          orderId,
          amount,
          movement: "out",
        })
      );
      dispatch(articleAction({ clientId, orderId }));
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
      }));
      if (amount > productPrice) {
        setEntryError("⚠️ Le montant de l'avoir est supérieur au total d'achat.");
      } else {
        setEntryError("");
      }
    }
  };

  return { handleConfirmCreditEntry };
};
