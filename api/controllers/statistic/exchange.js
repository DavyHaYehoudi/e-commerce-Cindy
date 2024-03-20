import OrderProducts from "../../models/orderProducts.model.js";

export const exchange = async (year) => {
  try {
    let filter = {};

    if (year !== "-1") {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(parseInt(year, 10) + 1, 0, 1);
      filter.createdAt = { $gte: startDate, $lt: endDate };
    }
    // Nombre total d'échanges
    const totalExchanges = await OrderProducts.aggregate([
      {
        $match: {
          ...filter,
          "orderProductsActions.exchange": { $exists: true },
        },
      },
      {
        $group: {
          _id: null,
          totalExchanges: { $sum: "$orderProductsActions.exchange" },
        },
      },
    ]);

    // Liste des échanges avec détails
    const exchangeDetails = await OrderProducts.aggregate([
      {
        $match: {
          $and: [
            filter,
            { "orderProductsActions.exchange": { $ne: null } }, // Correspond aux cas où exchange n'est pas null
            {
              $or: [
                { material: null }, // Correspond aux cas où material est null
                { material: { $ne: null } }, // Correspond aux cas où material n'est pas null
              ],
            },
          ],
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "clientId",
          foreignField: "_id",
          as: "clientDetails",
        },
      },
      {
        $unwind: "$clientDetails",
      },
      {
        $lookup: {
          from: "products",
          localField: "productsId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $lookup: {
          from: "materials",
          localField: "material",
          foreignField: "_id",
          as: "materialDetails",
        },
      },
      {
        $unwind: {
          path: "$materialDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          firstName: "$clientDetails.firstName",
          lastName: "$clientDetails.lastName",
          exchangeDate: "$orderProductsActions.exchangeDate",
          productName: "$productDetails.name",
          materialName: {
            $cond: {
              if: { $eq: ["$materialDetails", null] },
              then: null,
              else: "$materialDetails.name",
            },
          },
          exchangedQuantity: "$orderProductsActions.exchange",
        },
      },
    ]);

    return { totalExchanges, exchangeDetails };
  } catch (error) {
    console.log("Error folder statistic exchange.js :", error);
    throw error;
  }
};
