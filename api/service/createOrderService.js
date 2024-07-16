import Client from "../models/client.model.js";
import Giftcard from "../models/giftcard.model.js";
import Credit from "../models/credit.model.js";
import Product from "../models/product/product.model.js";
import clientRepository from "../repositories/clientRepository.js";
import OrderProducts from "../models/orderProducts.model.js";
import Order from "../models/order.model.js";
import orderService from "./orderService.js";
import checkAdvantages from "./advantageService.js";

export const updateOrder = async (orderNumber) => {
  const order = await Order.findOneAndUpdate(
    { orderNumber },
    { statusPayment: "paid" },
    {
      new: true,
    }
  );
  if (!order) {
    throw new Error("Commande introuvable pour sa mise à jour");
  }
  return order;
};
export const createOrderPending = async (req) => {
  const { clientId, advantages, shippingAddress, billingAddress } = req.body;
  // console.log('req.body:', req.body)
  // Calculer le montant total de la commande
  const inTotalAmount = await orderService.calculateOrderAmount(
    clientId,
    advantages
  );
  const { codePromoPercentage, giftcardAmount, creditAmount } =
    await checkAdvantages(advantages);
  const amountPromoCode = codePromoPercentage;
  const amountGiftcard = giftcardAmount;
  const amountCredit = creditAmount;
  const bodyCreateOrder = {
    clientId,
    inTotalAmount,
    amountPromoCode,
    amountGiftcard,
    amountCredit,
    shippingAddress,
    billingAddress,
  };
  const order = await Order.create(bodyCreateOrder);
  return order;
};

export const updateClient = async (
  clientId,
  orderId,
  isRememberMe,
  shippingAddress,
  billingAddress,
  inTotalAmount
) => {
  const bodyUpdateClient = { cart: [] };
  if (isRememberMe) {
    bodyUpdateClient.shippingAddress = shippingAddress;
    bodyUpdateClient.billingAddress = billingAddress;
  }
  await Client.findByIdAndUpdate(clientId, {
    $inc: { totalOrders: 1, totalOrderValue: inTotalAmount },
    $push: { orders: orderId },
    ...bodyUpdateClient,
  });
};
export const createGiftcard = async (clientId) => {
  const client = await clientRepository.findById(clientId);
  const cart = client?.cart;
  if (!cart || cart.length === 0) {
    throw new Error("Le panier est vide ou non défini.");
  }
  for (const item of cart) {
    const product = await Product.findById(item.productsId);
    if (product?.type === "giftcard") {
      const material = product.materials[0];
      if (!material) continue;
      const currentPrice = material.pricing.currentPrice;
      const data = {
        buyerId: clientId,
        amount: currentPrice,
      };
      await Giftcard.create(data);
    }
  }
};

export const updateGiftcard = async (advantages, clientId) => {
  const { giftcardAmount } = await checkAdvantages(advantages);
  if (giftcardAmount) {
    const code = advantages?.giftcard?.code;
    await Giftcard.findOneAndUpdate({ code }, { consumerId: clientId });
  }
};

export const updateCredit = async (advantages) => {
  const { creditAmount } = await checkAdvantages(advantages);
  if (creditAmount) {
    const creditId = advantages?.credit?.creditId;
    await Credit.findByIdAndUpdate(creditId, { isArchived: true });
  }
};

export const updateProductStock = async (clientId) => {
  const client = await clientRepository.findById(clientId);
  const cart = client?.cart;
  for (const item of cart) {
    const product = await Product.findById(item.productsId);

    let materialIndex;
    if (item.material) {
      materialIndex = product.materials.findIndex(
        (m) => m._id.toString() === item.material.toString()
      );
    } else if (product.materials.length === 1) {
      materialIndex = 0;
    } else {
      continue;
    }

    if (materialIndex !== -1) {
      product.materials[materialIndex].stock -= item.quantity;
    }

    await product.save();
  }
};

export const createOrderProducts = async (clientId, orderId) => {
  const client = await clientRepository.findById(clientId);
  const cart = client?.cart;
  const orderProductIds = [];
  for (const item of cart) {
    const product = await Product.findById(item.productsId);
    let material;
    if (item.material) {
      material = product.materials.find(
        (m) => m._id.toString() === item.material.toString()
      );
    } else if (product.materials.length === 1) {
      material = product.materials[0];
    } else {
      continue;
    }

    if (!material) {
      throw new Error(`Material for product ${item.productsId} not found.`);
    }

    const originalPrice = material.pricing.currentPrice;
    let finalPrice;
    let amountPromotion = null;
    if (
      material.promotion &&
      material.promotion.endDate &&
      new Date(material.promotion.endDate) > new Date()
    ) {
      amountPromotion = material.promotion.amount;
      finalPrice = originalPrice - originalPrice * (amountPromotion / 100);
    } else {
      finalPrice = originalPrice;
    }

    const orderProduct = new OrderProducts({
      clientId,
      orderId,
      productsId: item.productsId,
      quantity: item.quantity,
      originalPrice,
      finalPrice,
      amountPromotion,
      material: item.material || material?._id,
    });

    const savedOrderProduct = await orderProduct.save();
    orderProductIds.push(savedOrderProduct._id);
  }
  return orderProductIds;
};
