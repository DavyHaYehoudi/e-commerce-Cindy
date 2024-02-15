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
  createTrackingNumberClient: async (req, res) => {
    const { orderId } = req.params;
    const { trackingNumber } = req.body;
  
    try {
      const existingOrder = await Order.findById(orderId);
  
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      const isAdminFalseTrackingNumber = existingOrder.trackingNumber.find(
        (tn) => tn.isAdmin === false
      );
  
      if (isAdminFalseTrackingNumber) {
        return res
          .status(400)
          .json({ error: "Tracking number with isAdmin=false already exists" });
      }
  
      // Ajoutez le nouveau trackingNumber à la propriété trackingNumber
      existingOrder.trackingNumber.push(trackingNumber);
      await existingOrder.save();
  
      res.status(201).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  deleteTrackingNumberClient: async (req, res) => {
    const { orderId } = req.params;
    const { trackingNumberId } = req.query;

    try {
      const existingOrder = await Order.findById(orderId);

      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      existingOrder.trackingNumber.pull({ id: trackingNumberId });
      await existingOrder.save();

      res.status(200).json({});
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
};

export default orderController;
