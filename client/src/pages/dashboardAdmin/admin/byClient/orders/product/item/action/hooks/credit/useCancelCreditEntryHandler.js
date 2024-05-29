// Bouton d'annulation du champ de l'avoir
export const useCancelCreditEntryHandler = (setProductActions, setEntryError) => {
    const handleCancelCreditEntry = (e) => {
      e.stopPropagation();
      setProductActions((prevState) => ({
        ...prevState,
        isAddCredit: false,
        creditContent: { amount: null, dateExpire: null, code: null },
      }));
      setEntryError("");
    };
  
    return { handleCancelCreditEntry };
  };
  