import Client from "../../models/client.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product/product.model.js";

const orderController = {
  getAllOrders: async (req, res) => {
    const { client } = req;
    if (client.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    try {
      const { orderIds } = req.query;
      const parsedOrderIds = JSON.parse(orderIds);

      const orders = await Order.find({ _id: { $in: parsedOrderIds } }).exec();

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createTrackingNumberClient: async (req, res) => {
    const { orderId } = req.params;
    // console.log('orderId:', orderId)
    const { trackingNumber } = req.body;
    // console.log('trackingNumber:', trackingNumber)

    try {
      const existingOrder = await Order.findById(orderId);

      if (!existingOrder) {
        return res.status(404).json({ message: "La commande n'existe pas" });
      }

      const isAdminFalseTrackingNumber = existingOrder.trackingNumber.find(
        (tn) => tn?.isAdmin === false
      );

      if (isAdminFalseTrackingNumber) {
        console.log("Tracking number with isAdmin=false already exists.");
        return res
          .status(400)
          .json({ message: "Erreur côté client, requête invalide." });
      }

      // Ajoutez le nouveau trackingNumber à la propriété trackingNumber
      existingOrder.trackingNumber.push(trackingNumber);
      await existingOrder.save();

      res.status(201).json({});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTrackingNumberClient: async (req, res) => {
    const { orderId, trackingNumberId } = req.params;

    try {
      const existingOrder = await Order.findById(orderId);

      if (!existingOrder) {
        return res.status(404).json({ error: "La commande n'existe pas" });
      }

      existingOrder.trackingNumber.pull({ id: trackingNumberId });
      await existingOrder.save();

      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createOrder: async (req, res) => {
    console.log("req.body :", req.body);
    const { clientId, shippingAddress, billingAddress } = req.body;
    res.status(201).json({ message: "ressource créée avec succès" });
  },
  orderAmount : async (req, res) => {
    try {
      console.log('req.query:', req.query)
      const { clientId } = req.query;
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ message: "Le client n'existe pas." });
      }
  
      const cart = client.cart;
      let totalAmount = 0;
  
      for (const item of cart) {
        const product = await Product.findById(item.productsId).lean();
        if (!product) {
          continue; // Skip this item if product is not found
        }
  
        let material;
        if (item.material) {
          material = product.materials.find(m => m._id.toString() === item.material.toString());
        } else if (product.materials.length === 1) {
          material = product.materials[0];
        } else {
          continue; // Skip this item if material is not specified and there are multiple materials
        }
  
        if (!material || !material.isActive || material.isArchived) {
          continue; // Skip this item if material is not valid
        }
  
        let price = material.pricing.currentPrice;
        if (material.promotion && material.promotion.endDate > new Date()) {
          price -= (price * material.promotion.amount) / 100;
        }
  
        totalAmount += price * item.quantity;
      }
  
      console.log('totalAmount:', totalAmount)
      res.status(200).json({ totalAmount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default orderController;
