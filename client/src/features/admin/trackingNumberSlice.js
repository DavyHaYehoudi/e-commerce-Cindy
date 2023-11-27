import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const trackingNumberSlice = createSlice({
  name: "trackingNumber",
  initialState: usersMock,
  reducers: {
    addTrackingNumber: (state, action) => {
      const { userId, orderId, trackingNumber } = action.payload;

      const updatedState = state.map((user) =>
        user.id === userId
          ? {
              ...user,
              orders: user.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      trackingNumber: [...order.trackingNumber, trackingNumber],
                    }
                  : order
              ),
            }
          : user
      );

      return updatedState;
    },
    deleteTrackingNumber: (state, action) => {
      const { clientId, orderId, trackingNumberId } = action.payload;

      const updatedState = state.map((user) =>
        user.id === clientId
          ? {
              ...user,
              orders: user.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      trackingNumber: order.trackingNumber.filter(
                        (tn) => tn.id !== trackingNumberId
                      ),
                    }
                  : order
              ),
            }
          : user
      );

      return updatedState;
    },
  },
});

export const { addTrackingNumber, deleteTrackingNumber } =
  trackingNumberSlice.actions;
export default trackingNumberSlice.reducer;
