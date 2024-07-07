import Order from "../../models/order.model.js";
import Stripe from "stripe";
import orderService from "../../service/orderService.js";
import checkAdvantages from "../../service/advantageService.js";
import Client from "../../models/client.model.js";

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
  orderAmount: async (req, res) => {
    try {
      const clientId = req.query.clientId;
      const advantages = req.query.advantages
        ? JSON.parse(req.query.advantages)
        : null;
      const totalAmount = await orderService.calculateOrderAmount(
        clientId,
        advantages
      );
      res.status(200).json({ totalAmount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  payment: async (req, res) => {
    const { email, advantages = null, clientId } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const amount = await orderService.calculateOrderAmount(
      clientId,
      advantages
    );

    try {
      // Rechercher un client existant par email
      const existingCustomers = await stripe.customers.list({
        email: email,
      });

      let customer;
      if (existingCustomers.data.length > 0) {
        // Utiliser le client existant
        customer = existingCustomers.data[0];
      } else {
        // Créer un nouveau client
        customer = await stripe.customers.create({
          email,
        });
      }

      const customerId = customer.id;
      const amountFormatStripe = Math.floor(amount * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountFormatStripe,
        currency: "EUR",
        customer: customerId,
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ error: error.message });
    }
  },
  createOrder: async (req, res) => {
    try {
      // console.log("req.body:", req.body);
      const {
        clientId,
        advantages,
        isRememberMe,
        shippingAddress,
        billingAddress,
      } = req.body;
      const inTotalAmount = await orderService.calculateOrderAmount(
        clientId,
        advantages
      );
      const { codePromoPercentage } = await checkAdvantages(advantages);
      const amountPromoCode = codePromoPercentage || "";
      const bodyCreateOrder = { ...req.body, inTotalAmount, amountPromoCode };
        // Créer la commande
        const order = await Order.create(bodyCreateOrder);

        const bodyUpdateClient = { cart: [] };
        if (isRememberMe) {
          bodyUpdateClient.shippingAddress = shippingAddress;
          bodyUpdateClient.billingAddress = billingAddress;
        }
    
        // Mettre à jour le client
        await Client.findByIdAndUpdate(clientId, {
          $inc: { totalOrders: 1, totalOrderValue: inTotalAmount },
          $push: { orders: order._id },
          ...bodyUpdateClient
        });

      res.status(201).json({ message: "commande créée avec succès" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default orderController;
