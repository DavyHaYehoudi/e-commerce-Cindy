import Client from "../../models/client.model.js";
import Order from "../../models/order.model.js";
import OrderProducts from "../../models/orderProducts.model.js";
import { filterByYear } from "../../utils/filterByYear.js";

export const analytic = async (year) => {
  try {
    const filter = filterByYear(year);

    // Nombre total de commandes
    const ordersCount = await Order.countDocuments(filter);
    // Montant total des commandes
    const totalOrderAmount = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$inTotalAmount" },
        },
      },
    ]);

    // Nombre de commandes annulées
    const ordersCanceled = await Order.countDocuments({
      ...filter,
      step: 6,
    });
    // Montant total des commandes annulées
    const totalCanceledAmount = await Order.aggregate([
      { $match: { ...filter, step: 6 } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$inTotalAmount" },
        },
      },
    ]);
    // Nombre de commandes du mois en cours
    const currentDate = new Date();
    const currentMonthStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const currentMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const currentMonthOrdersCount = await Order.countDocuments({
      createdAt: { $gte: currentMonthStartDate, $lte: currentMonthEndDate },
    });

    // Moyenne du montant des commandes
    const averageInTotalAmount = await Order.aggregate([
      { $match: filter },
      { $group: { _id: null, average: { $avg: "$inTotalAmount" } } },
    ]);

    const averageByOrder =
      averageInTotalAmount.length > 0
        ? parseFloat(averageInTotalAmount[0].average.toFixed(2))
        : 0;

    // Liste des produits les plus vendus
    const topSellingProducts = await OrderProducts.aggregate([
      { $match: filter }, // Filtre pour les commandes concernées
      { $group: { _id: "$productsId", totalQuantity: { $sum: "$quantity" } } }, // Regrouper par produit et calculer la quantité totale vendue
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id",
          foreignField: "_id",
          as: "productDetails", // Alias pour stocker les détails du produit
        },
      }, // Joindre les détails du produit
      { $unwind: "$productDetails" }, // Dérouler le tableau des détails du produit
      {
        $lookup: {
          from: "materials", // Nom de la collection des matériaux
          localField: "productDetails.materials._id", // Champ de matériaux dans le schéma du produit
          foreignField: "_id",
          as: "materialDetails", // Alias pour stocker les détails du matériau
        },
      }, // Joindre les détails du matériau
      { $unwind: "$materialDetails" }, // Dérouler le tableau des détails du matériau
      {
        $group: {
          _id: { productId: "$_id", materialId: "$materialDetails._id" }, // Regrouper par ID de produit et ID de matériau
          productName: { $first: "$productDetails.name" }, // Récupérer le nom du produit
          materialName: { $first: "$materialDetails.name" }, // Récupérer le nom du matériau
          totalQuantity: { $sum: "$totalQuantity" }, // Calculer la quantité totale vendue
        },
      }, // Regrouper par ID de produit et ID de matériau
      {
        $project: {
          _id: 0, // Masquer l'ID
          productId: "$_id.productId", // Récupérer l'ID du produit
          productName: 1, // Afficher le nom du produit
          materialName: 1, // Afficher le nom du matériau
          totalQuantity: 1, // Afficher la quantité totale vendue
        },
      }, // Projeter les champs nécessaires
      { $sort: { totalQuantity: -1 } }, // Trier par quantité totale vendue
    ]);

    // Liste des produits les plus fréquents dans les paniers
    const topCartProducts = await Client.aggregate([
      { $match: filter }, // Filtre pour les clients concernés
      { $unwind: "$cart" }, // Dérouler le tableau des produits dans le panier
      {
        $group: {
          _id: "$cart.productsId",
          totalQuantity: { $sum: "$cart.quantity" },
        },
      }, // Regrouper par produit et calculer la quantité totale dans les paniers
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id",
          foreignField: "_id",
          as: "productDetails", // Alias pour stocker les détails du produit
        },
      }, // Joindre les détails du produit
      { $unwind: "$productDetails" }, // Dérouler le tableau des détails du produit
      {
        $lookup: {
          from: "materials", // Nom de la collection des matériaux
          localField: "productDetails.materials._id",
          foreignField: "_id",
          as: "materialDetails", // Alias pour stocker les détails du matériau
        },
      }, // Joindre les détails du matériau
      { $unwind: "$materialDetails" }, // Dérouler le tableau des détails du matériau
      {
        $group: {
          _id: {
            productId: "$productDetails._id",
            productName: "$productDetails.name",
            materialId: "$materialDetails._id",
            materialName: "$materialDetails.name",
          },
          totalQuantity: { $sum: "$totalQuantity" },
        },
      }, // Regrouper par produit et matériau et calculer la quantité totale
      {
        $project: {
          _id: 0, // Masquer l'ID
          productId: "$_id.productId", // Récupérer l'ID du produit
          productName: "$_id.productName", // Récupérer le nom du produit
          materialId: "$_id.materialId", // Récupérer l'ID du matériau
          materialName: "$_id.materialName", // Récupérer le nom du matériau
          totalQuantity: 1, // Afficher la quantité totale vendue
        },
      }, 
      { $sort: { totalQuantity: -1 } }, // Trier par quantité totale dans le panier
    ]);

    return {
      ordersCount,
      totalOrderAmount:
        totalOrderAmount.length > 0 ? totalOrderAmount[0].totalAmount : 0,
      ordersCanceled,
      totalOrdersCanceledAmount:
        totalCanceledAmount.length > 0 ? totalCanceledAmount[0].totalAmount : 0,
      currentMonthOrdersCount,
      averageByOrder,
      topSellingProducts,
      topCartProducts,
    };
  } catch (error) {
    console.log("Error folder statistic analytic.js :", error);
    throw error;
  }
};
