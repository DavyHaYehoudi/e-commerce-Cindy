import Client from "../models/client.model.js";
import Giftcard from "../models/giftcard.model.js";
import Credit from "../models/credit.model.js";
import Product from "../models/product/product.model.js";
import clientRepository from "../repositories/clientRepository.js";
import OrderProducts from "../models/orderProducts.model.js";
import Order from "../models/order.model.js";

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
};

export const updateClient = async (
  clientId,
  inTotalAmount,
  orderId,
  isRememberMe,
  shippingAddress,
  billingAddress
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

export const updateGiftcard = async (advantages, giftcardAmount, clientId) => {
  if (giftcardAmount) {
    const code = advantages?.giftcard?.code;
    await Giftcard.findOneAndUpdate({ code }, { consumerId: clientId });
  }
};

export const updateCredit = async (advantages, creditAmount) => {
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
 