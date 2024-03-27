export const statsBalance = (
  totalOrderAmount,
  totalAmountGiftcards,
  totalOrdersCanceledAmount,
  totalRefundAmount,
  totalCredits
) => {
  const inTotal = totalOrderAmount + totalAmountGiftcards;
  const outTotal = totalOrdersCanceledAmount + totalRefundAmount + totalCredits;
  const balance = inTotal - outTotal;
  return { balance, inTotal, outTotal };
};
