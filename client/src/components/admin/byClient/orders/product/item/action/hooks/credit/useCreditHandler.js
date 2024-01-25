// Au clic sur l'item avoir, déterminer si c'est pour le générer ou l'annuler
export const useCreditHandler = (
  actions,
  setInteraction,
  setConfirmation,
  setProductActions,
  productsByOrderInfo,
  productsByOrderActions
) => {
  const handleCredit = (action) => {
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));

    // Si la propriété a une value c'est donc un clic pour annulation
    if (productsByOrderInfo[action]) {
      setConfirmation((prevState) => ({
        ...prevState,
        isConfirmationVisible: true,
        confirmAction: action,
      }));
      // Sinon, c'est pour attribuer une value à la propriété
    } else {
      const updatedProductActions = {
        ...productsByOrderActions,
        isAddCredit: action === actions.CREDIT,
      };
      setProductActions(updatedProductActions);
    }
  };

  return { handleCredit };
};
