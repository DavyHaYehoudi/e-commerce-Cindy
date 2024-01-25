import { createSelector } from "reselect";

const selectCreditsStore = (state) => state?.credit?.data;
const selectProductId = (_, props) => props?.productId;

export const getCreditsInfo = createSelector(
  [selectCreditsStore, selectProductId],
  (creditStore, productId) => {
    const credit = creditStore?.find(
      (credit) => credit?.productsByOrderId === productId
    );
    const { amount, code, dateExpire } = credit ?? {};
    return { amount, code, dateExpire };
  }
);
