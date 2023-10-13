import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../mocks/usersMock";
import { orderStatus } from "../mocks/orderStatus";

const orderStatusMap = {
  [orderStatus[0].name]: orderStatus[1].name,
  [orderStatus[1].name]: orderStatus[2].name,
  [orderStatus[2].name]: orderStatus[3].name,
  [orderStatus[3].name]: orderStatus[0].name,
};

const orderStatusSlice = createSlice({
  name: "ordersStatus",
  initialState: usersMock,
  reducers: {
    handleOrderStatusChange: (state, action) => {
      const {
        orderId,
        isNextStatusOrder,
        newOrder,
        trackingNumber,
        inProcessingOrder,
        completedOrder,
        isClientNotified,
      } = action.payload;

      return state.map((user) => {
        return {
          ...user,
          orders: user.orders.map((order) => {
            if (order.id === orderId) {
              const currentStatus = order.status;
              const nextStatus =
                orderStatusMap[currentStatus] || orderStatus[0].name;

              return {
                ...order,
                status: isNextStatusOrder ? nextStatus : order.status,
                isNextStatusOrder: isNextStatusOrder,
                newOrder:newOrder,
                trackingNumber: trackingNumber,
                inProcessingOrder: inProcessingOrder,
                completedOrder:completedOrder,
                isClientNotified:isClientNotified,
              };
            }
            return order;
          }),
        };
      });
    },
  },
});

export const { handleOrderStatusChange } = orderStatusSlice.actions;

export default orderStatusSlice.reducer;
