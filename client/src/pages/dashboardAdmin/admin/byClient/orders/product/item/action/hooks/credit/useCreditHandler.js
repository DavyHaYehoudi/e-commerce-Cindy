// Au clic sur l'item avoir, déterminer si c'est pour le générer ou l'annuler
export const useCreditHandler = (
  actions,
  setInteraction,
  setConfirmation,
  setProductActions,
  orderProductsInfo,
  orderProductsActions
) => {
  const handleCredit = (action) => {
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));

    // Si la propriété a une value c'est donc un clic pour annulation
    if (orderProductsInfo?.[action]) {
      setConfirmation((prevState) => ({
        ...prevState,
        isConfirmationVisible: true,
        confirmAction: action,
      }));
      // Sinon, c'est pour attribuer une value à la propriété
    } else {
      const updatedProductActions = {
        ...orderProductsActions,
        isAddCredit: action === actions.CREDIT,
      };
      setProductActions(updatedProductActions);
    }
  };

  return { handleCredit };
};
