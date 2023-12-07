// Champ pour la date de validité de l'avoir
export const useCreditDateHandler = (setProductActions) => {
  const handleChangeInputCreditDate = (e) => {
    setProductActions((prevState) => ({
      ...prevState,
      creditContent: {
        ...prevState.creditContent,
        dateExpire: e.target.value,
      },
    }));
  };

  return { handleChangeInputCreditDate };
};
