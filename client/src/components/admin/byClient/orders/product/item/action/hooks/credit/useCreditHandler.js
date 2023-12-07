// Au clic sur l'item avoir, déterminer si c'est pour le générer ou l'annuler
export const useCreditHandler = (
  actions,
  setInteraction,
  setConfirmation,
  setProductActions,
  productsInfo,
  productsActions
) => {
  const handleCredit = (action) => {
    setInteraction((prevState) => ({ ...prevState, activeLi: action }));

    // Si la propriété a une value c'est donc un clic pour annulation
    if (productsInfo[action]) {
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

  return { handleCredit };
};
