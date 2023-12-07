// Champ du montant de l'avoir
export const useCreditAmountHandler = (setProductActions) => {
  const handleChangeInputCreditAmount = (e) => {
    setProductActions((prevState) => ({
      ...prevState,
      creditContent: {
        ...prevState.creditContent,
        amount: parseInt(e.target.value),
      },
    }));
  };

  return { handleChangeInputCreditAmount };
};
