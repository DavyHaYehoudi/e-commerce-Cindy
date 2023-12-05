import { createSlice } from "@reduxjs/toolkit";
import { creditsMock } from "../../mocks/credits";
import { generateRandomCode } from "../../helpers/creditCode";

const creditsSlice = createSlice({
  name: "credits",
  initialState: creditsMock,
  reducers: {
    addCredit: (state, action) => {
      const { productsId, amount, dateExpire } = action.payload;
      const id = generateRandomCode(); //A faire en Back
      return [...state, { id, productsId, amount, dateExpire }];
    },
    deleteCredit: (state, action) => {
      const { productsId } = action.payload;
      return state.filter((item) => item.productsId !== productsId);
    },
  },
});
export const { addCredit, deleteCredit } = creditsSlice.actions;
export default creditsSlice.reducer;
