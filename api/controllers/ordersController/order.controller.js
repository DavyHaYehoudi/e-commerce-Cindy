import Order from "../../models/order.model.js";
import Stripe from "stripe";
import orderService from "../../service/orderService.js";
import checkStockAvailability from "../../service/checkStockAvailability.js";
import {
  ClientNotFoundError,
  ProductNotFoundError,
  MaterialNotFoundError,
  InsufficientStockError,
} from "../../service/errors.js";
import {
  createOrderPending,
  createOrderProducts,
  updateClient,
  updateCredit,
  updateGiftcard,
  updateOrder,
  updateProductStock,
} from "../../service/createOrderService.js";
import { sendPaymentEmail } from "../../service/emailPayment.js";

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
      // Vérifier la disponibilité du stock
      await checkStockAvailability(clientId);
      const totalAmount = await orderService.calculateOrderAmount(
        clientId,
        advantages
      );
      res.status(200).json({ totalAmount });
    } catch (error) {
      if (error instanceof ClientNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof ProductNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof MaterialNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof InsufficientStockError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ error: "Erreur serveur interne" });
      }
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
      // Vérifier la disponibilité du stock
      await checkStockAvailability(clientId);
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
      if (error instanceof ClientNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof ProductNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof MaterialNotFoundError) {
        res.status(404).json({ message: error.message });
      } else if (error instanceof InsufficientStockError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ error: "Erreur serveur interne" });
      }
    }
  },
  orderPending: async (req, res) => {
    try {
      const order = await createOrderPending(req);
      res.status(201).json({
        message: "Commande créée avec succès",
        orderNumber: order?.orderNumber,
      });
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      res.status(500).json({ error: "Erreur serveur interne" });
    }
  },
  orderConfirm: async (req, res) => {
    try {
      const {
        orderNumber,
        advantages,
        clientId,
        isRememberMe,
        shippingAddress,
        billingAddress,
        email
      } = req.body;
      const order = await updateOrder(orderNumber);
      await updateGiftcard(advantages, clientId);
      await updateCredit(advantages);
      await updateProductStock(clientId);
      const orderProductIds = await createOrderProducts(clientId, order._id);
      await Order.findByIdAndUpdate(order._id, {
        $set: { orderProducts: orderProductIds },
      });
      await updateClient(
        clientId,
        order?._id,
        isRememberMe,
        shippingAddress,
        billingAddress,
        order?.inTotalAmount
      );
      // sendPaymentEmail(email,orderNumber)
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default orderController;
