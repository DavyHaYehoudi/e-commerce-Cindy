import clientRepository from '../repositories/clientRepository.js';
import productRepository from '../repositories/productRepository.js';
import checkAdvantages from './advantageService.js';

const calculateOrderAmount = async (clientId, advantages) => {
  const client = await clientRepository.findById(clientId);
  if (!client) {
    throw new Error("Le client n'existe pas.");
  }

  const cart = client.cart;
  let totalAmount = 0;

  for (const item of cart) {
    const product = await productRepository.findById(item.productsId);
    if (!product) {
      continue;
    }

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

    if (!material || !material.isActive || material.isArchived) {
      continue;
    }

    let price = material.pricing.currentPrice;
    if (material.promotion && material.promotion.endDate > new Date()) {
      price -= (price * material.promotion.amount) / 100;
    }

    totalAmount += price * item.quantity;
  }

  const advantagesResult = await checkAdvantages(advantages);
  const codePromoPercentage = advantagesResult?.codePromoPercentage;
  if (codePromoPercentage) {
    console.log('codePromoPercentage:', codePromoPercentage)
    totalAmount -= (totalAmount * codePromoPercentage) / 100;
  }

  const giftCardAmount = advantagesResult?.giftcardAmount;
  if (giftCardAmount) {
    console.log('giftCardAmount:', giftCardAmount)
    totalAmount -= giftCardAmount;
  }

  const creditAmount = advantagesResult?.creditAmount;
  if (creditAmount) {
    totalAmount -= creditAmount;
  }

  return totalAmount;
};

export default {
  calculateOrderAmount,
};
