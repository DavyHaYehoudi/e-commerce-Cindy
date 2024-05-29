// Bouton de validation du champ de l'avoir
import { useDispatch } from "react-redux";
import { addCredit } from "../../../../../../../../../../features/admin/creditSlice";
import {
  totalsInOut,
} from "../../../../../../../../../../features/admin/ordersSlice";
import { updateActionContent } from "../../../../../../../../../../features/admin/orderProductsSlice";

export const useConfirmCreditEntryHandler = () => {
  const dispatch = useDispatch();

  const handleConfirmCreditEntry = (
    e,
    action,
    orderProductsActions,
    setProductActions,
    setEntryError,
    orderId,
    orderProducts,
    productPrice,
    clientId
  ) => {
    e.stopPropagation();
    let { amount, dateExpire } = orderProductsActions.creditContent;
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
          orderProductsId: orderProducts._id,
          amount: orderProductsActions.creditContent.amount,
          dateExpire: orderProductsActions.creditContent?.dateExpire,
          clientId
        })
      );
      dispatch(
        updateActionContent({
          creditContent: orderProducts._id,
          orderProductsId: orderProducts._id,
          updatedProperty: action,
        })
      );
      dispatch(
        totalsInOut({
          orderId,
          amount,
          movement: "out",
        })
      );
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
      }));
      if (amount > productPrice) {
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
