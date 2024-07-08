import Product from "../models/product/product.model.js";
import clientRepository from "../repositories/clientRepository.js";
import {
  ClientNotFoundError,
  ProductNotFoundError,
  MaterialNotFoundError,
  InsufficientStockError,
} from './errors.js';

const checkStockAvailability = async (clientId) => {
  const client = await clientRepository.findById(clientId);
  if (!client) {
    throw new ClientNotFoundError("Le client n'existe pas.");
  }
  const cart = client.cart; 
  for (const item of cart) {
    const product = await Product.findById(item.productsId);
    if (!product) {
      throw new ProductNotFoundError(`Produit avec ID ${item.productsId} non trouvé.`);
    }

    let material;
    if (item.material) {
      material = product.materials.find(
        (m) => m._id.toString() === item.material.toString()
      );
      if (!material) {
        throw new MaterialNotFoundError(
          `Matériau avec ID ${item.material} non trouvé pour le produit ${item.productsId}.`
        );
      }
    } else if (product.materials.length === 1) {
      material = product.materials[0];
    } else {
      throw new MaterialNotFoundError(
        `Le produit ${item.productsId} a plusieurs matériaux, mais aucun ID de matériau n'a été fourni.`
      );
    }

    if (material.stock < item.quantity) {
      throw new InsufficientStockError(
        `Stock insuffisant pour le produit ${item.productsId}, matériau ${material._id}. Disponible : ${material.stock}, Requis : ${item.quantity}`
      );
    }
  }
};

export default checkStockAvailability;
