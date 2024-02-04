import Order from "../models/order.model.js";
const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    // Implementation for getting a client by ID
  },

  createOrder: async (req, res) => {
    // Implementation for creating a new client
  },

  updateOrder: async (req, res) => {
    const ordersActions = [
      { id: 0, number: 0 },
      { id: 1, number: 1 },
      { id: 2, number: 2 },
      { id: 3, number: 3 },
      { id: 4, number: 4 },
      { id: 5, number: 5 },
      { id: 6, number: 6 },
    ];
    const applyOrderAction = (order, action, updateFunction) => {
      return updateFunction(order, action);
    };

    const updateMoveToNextStep = (
      order,
      { step, isClientNotified, isNextStepOrder }
    ) => {
      const currentStepIndex = ordersActions.findIndex(
        (s) => s.number === order.step
      );

      const nextStepIndex = (currentStepIndex + 1) % ordersActions.length;
      const nextStep = isNextStepOrder
      ? ordersActions[nextStepIndex].number
      : step;
      console.log('nextStep:', nextStep)

      order.step = nextStep;
  order.isClientNotified = isClientNotified;

  return order;
    };

    const updateOrderStep = (order, { step, isClientNotified }) => 
     { order.step = step;
      order.isClientNotified = isClientNotified;
    
      return order;}
    
    try {
      const { orderId } = req.params;
      const { actionType } = req.body;

      const existingOrder = await Order.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      let updatedOrder;

      switch (actionType) {
        case "moveToNextStep":
          updatedOrder = applyOrderAction(
            existingOrder,
            req.body,
            updateMoveToNextStep
          );
          break;
        case "cancelOrder":
          updatedOrder = applyOrderAction(
            existingOrder,
            req.body,
            updateOrderStep
          );
          break;
        case "reactivateOrder":
          updatedOrder = applyOrderAction(
            existingOrder,
            req.body,
            updateOrderStep
            );
            break;
            // ... (Ajoute des cas pour les autres actions)
            default:
              return res.status(400).json({ error: "Invalid action type" });
            }
            console.log('updatedOrder:', updatedOrder)

      const savedOrder = await existingOrder.save()

      res.status(200).json({
        message: "Order updated successfully",
        updatedOrder: savedOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteOrder: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default orderController;
