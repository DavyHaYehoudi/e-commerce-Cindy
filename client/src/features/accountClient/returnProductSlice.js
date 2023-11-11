import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";
import { orderStep } from "../../mocks/orderStep";

export const ordersStep = [
  { id: 0, name: orderStep[0].name },
  { id: 1, name: orderStep[1].name },
  { id: 2, name: orderStep[2].name },
  { id: 3, name: orderStep[3].name },
  { id: 4, name: orderStep[4].name },
  { id: 5, name: orderStep[5].name },
  { id: 6, name: orderStep[6].name },
];

const returnProductSlice = createSlice({
  name: "returnProduct",
  initialState: usersMock,
  reducers: {
    trackingNumberAdminChange: (state, action) =>
      applyOrderAction(
        state,
        action,
        (order, payload) => ({
          ...order,
          isClientNotified: payload.isClientNotified,
          trackingNumberAdmin: payload.trackingNumberAdmin,
        })
      ),
  },
});

export const { trackingNumberAdminChange,
} = returnProductSlice.actions;

export default returnProductSlice.reducer;
