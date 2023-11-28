import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const trackingNumberSlice = createSlice({
  name: "trackingNumber",
  initialState: usersMock,
  reducers: {
    addAdminTrackingNumber: (state, action) => {
      const { clientId, orderId, trackingNumber } = action.payload;

      const updatedState = state.map((user) =>
        user.id === clientId
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
    updatedClientTrackingNumber: (state, action) => {
      const { clientId, orderId, trackingNumber } = action.payload;
  
      const updatedState = state.map((user) =>
        user.id === clientId
          ? {
              ...user,
              orders: user.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      trackingNumber: order.trackingNumber.map((tn) =>
                        tn.id === trackingNumber.id ? { ...tn, ...trackingNumber } : tn
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

export const {
  addAdminTrackingNumber,
  deleteTrackingNumber,
  updatedClientTrackingNumber,
} = trackingNumberSlice.actions;
export default trackingNumberSlice.reducer;
