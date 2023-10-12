import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../mocks/usersMock";
import { orderStatus } from "../mocks/orderStatus";

const orderStatusMap = {
  [orderStatus[0]]: orderStatus[1],
  [orderStatus[1]]: orderStatus[2],
  [orderStatus[2]]: orderStatus[3],
  [orderStatus[3]]: orderStatus[0],
};

const orderStatusSlice = createSlice({
  name: "ordersStatus",
  initialState: usersMock,
  reducers: {
    handleOrderStatusChange: (state, action) => {
      const {
        orderId,
        isStatusModified,
        isModified,
        nonTraitee,
        trackingNumber,
      } = action.payload;

      state = state.map((user) => {
        user.orders = user.orders.map((order) => {
          if (order.id === orderId) {
            const currentStatus = order.status;
            const nextStatus = orderStatusMap[currentStatus] || orderStatus[0];

            return {
              ...order,
              status: nextStatus,
              isStatusOrderModified: isStatusModified,
              isModified: isModified,
              nonTraitee: nonTraitee,
              trackingNumber: trackingNumber,
            };
          }
          return order;
        });

        return user;
      });
    },
  },
});

export const { handleOrderStatusChange } = orderStatusSlice.actions;

export default orderStatusSlice.reducer;
