import { createSelector } from "reselect";

const selectCreditsStore = (state) => state?.credit?.data;
const selectProductId = (_, props) => props?.productsId;

export const getCreditsInfo = createSelector(
  [selectCreditsStore, selectProductId],
  (creditStore, productsId) => {
    const credit = creditStore?.find(
      (credit) => credit?.orderProductsId === productsId
    );
    const { amount, code, dateExpire } = credit ?? {};
    return { amount, code, dateExpire };
  }
);
