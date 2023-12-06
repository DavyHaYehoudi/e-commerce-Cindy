export const getCreditsInfo = (creditsStore, productsId) => {
  const credit = creditsStore.find(
    (credit) => credit.productsId === productsId
  );
  const { amount, code, dateExpire } = credit ?? {};
  return { amount, code, dateExpire };
};
