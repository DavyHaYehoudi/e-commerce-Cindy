// Bouton de validation du champ de l'avoir
import { useDispatch } from "react-redux";
import {
  updateOrder,
} from "../../../../../../../../../features/admin/ordersSlice";
import { updateActionContent } from "../../../../../../../../../features/admin/productsByOrderSlice";
import { addCredit } from "../../../../../../../../../features/admin/creditSlice";

export const useConfirmCreditEntryHandler = () => {
  const dispatch = useDispatch();

  const handleConfirmCreditEntry = (
    e,
    action,
    productsByOrderActions,
    setProductActions,
    setEntryError,
    orderId,
    productsByOrder,
    productPrice
  ) => {
    e.stopPropagation();
    let { amount, dateExpire } = productsByOrderActions?.creditContent;
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
          productsByOrderId: productsByOrder._id,
          amount: productsByOrderActions.creditContent.amount,
          dateExpire: productsByOrderActions.creditContent?.dateExpire,
        })
      );
      dispatch(
        updateActionContent({
          creditContent: productsByOrder._id,
          updatedProperty: action,
          isClientNotified: false,
          productsByOrderId: productsByOrder._id,
        })
      );

      dispatch(
        updateOrder({
          orderId,
          amount,
          movement: "out",
          actionType:"totalsInOut"
        })
      );
      // dispatch(updateOrder({ orderId, actionType: "articleAction" }));
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
      }));
      if (amount > productsByOrder.quantity * productPrice) {
        setEntryError(
          "⚠️ Le montant de l'avoir est supérieur au total d'achat."
        );
      } else {
        setEntryError("");
      }
    }
  };

  return { handleConfirmCreditEntry };
};
