import Client from "../../models/client.model.js";
import Order from "../../models/order.model.js";
import OrderProducts from "../../models/orderProducts.model.js";
import { filterByYear } from "../../utils/filterByYear.js";

export const analytic = async (year) => {
  try {
    const filter = filterByYear(year)
    
    // Nombre total de commandes
    const ordersCount = await Order.countDocuments(filter);
    // Nombre de commandes annulées
    const ordersCanceled = await Order.countDocuments({
      ...filter,
      step: 6,
    });

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
      { $match: filter },
      {
        $group: { _id: "$productsId", totalQuantity: { $sum: "$quantity" } },
      },
      { $sort: { totalQuantity: -1 } },
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id",
          foreignField: "_id",
          as: "productDetails", // Alias pour stocker les détails du produit
        },
      },
      { $unwind: "$productDetails" }, // Dérouler le tableau des détails du produit
      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          totalQuantity: "$totalQuantity",
        },
      },
    ]);

    // Liste des produits les plus fréquents dans les paniers
    const topCartProducts = await Client.aggregate([
      { $match: filter },
      { $unwind: "$cart" }, // Dérouler le tableau des produits dans le panier
      {
        $group: {
          _id: "$cart.productsId",
          totalQuantity: { $sum: "$cart.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      {
        $lookup: {
          from: "products", // Nom de la collection des produits
          localField: "_id",
          foreignField: "_id",
          as: "productDetails", // Alias pour stocker les détails du produit
        },
      },
      { $unwind: "$productDetails" }, // Dérouler le tableau des détails du produit
      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          totalQuantity: "$totalQuantity",
        },
      },
    ]);
    return {
      ordersCount,
      ordersCanceled,
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
