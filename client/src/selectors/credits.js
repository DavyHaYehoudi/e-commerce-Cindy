import { createSelector } from "reselect";

const selectCreditsStore = (state) => state.credits;
const selectProductId = (_, props) => props.productId;

export const getCreditsInfo = createSelector(
  [selectCreditsStore, selectProductId],
  (creditsStore, productId) => {
    const credit = creditsStore.find(
      (credit) => credit.productsId === productId
    );

    const { amount, code, dateExpire } = credit ?? {};
    return { amount, code, dateExpire };
  }
);
