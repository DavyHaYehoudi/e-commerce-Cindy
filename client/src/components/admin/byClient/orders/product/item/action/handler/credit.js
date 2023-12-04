import { articleAction, totalsInOut } from "../../../../../../../../features/admin/ordersSlice";

// Au clic sur l'item avoir, déterminer si c'est pour le générer ou l'annuler
export const handleCredit = (
  action,
  setInteraction,
  productsInfo,
  setConfirmation,
  productsActions,
  actions,
  setProductActions
) => {
  setInteraction((prevState) => ({ ...prevState, activeLi: action }));
  // Si la propriété a une value c'est donc un click pour annulation
  if (productsInfo[action]?.amount) {
    setConfirmation((prevState) => ({
      ...prevState,
      isConfirmationVisible: true,
      confirmAction: action,
    }));
    // Sinon, c'est pour attribuer une value à la propriété
  } else {
    const updatedProductActions = {
      ...productsActions,
      isAddCredit: action === actions.CREDIT,
    };
    setProductActions(updatedProductActions);
  }
};
// Champ du montant de l'avoir
export const handleChangeInputCreditAmount = (e, setProductActions) => {
  setProductActions((prevState) => ({
    ...prevState,
    creditContent: {
      ...prevState.creditContent,
      amount: parseInt(e.target.value),
    },
  }));
};
// Champ pour la date de validité de l'avoir
export const handleChangeInputCreditDate = (e, setProductActions) => {
  setProductActions((prevState) => ({
    ...prevState,
    creditContent: {
      ...prevState.creditContent,
      dateExpire: e.target.value,
    },
  }));
};
// Bouton de validation du champ de l'avoir
export const handleConfirmCreditEntry = (
  e,
  action,
  productsActions,
  setProductActions,
  setEntryError,
  generateRandomCode,
  dispatch,
  clientId,
  productId,
  orderId,
  updateActionContent,
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
    const code = generateRandomCode();
    const productActionContent = {
      amount: productsActions.creditContent.amount,
      dateExpire: productsActions.creditContent?.dateExpire,
      code,
    };
    dispatch(
      updateActionContent({
        productId,
        updatedProperty: action,
        isClientNotified:false,
        productActionContent,
      })
    );
    dispatch(
      totalsInOut({
        orderId,
        amount,
        movement: "out",
      })
    );
    dispatch(articleAction({clientId, orderId}));
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
// Bouton d'annulation du champ de l'avoir
export const handleCancelCreditEntry = (
  e,
  setProductActions,
  setEntryError
) => {
  e.stopPropagation();
  setProductActions((prevState) => ({
    ...prevState,
    isAddCredit: false,
    creditContent: { amount: null, dateExpire: null, code: null },
  }));
  setEntryError("");
};
