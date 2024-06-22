import OrderProducts from "../../models/orderProducts.model.js";
import { filterByYear } from "../../utils/filterByYear.js";

export const refund = async (year) => {
  try {
    const filter = filterByYear(year);

    const refundDetails = await OrderProducts.aggregate([
      {
        $match: {
          ...filter,
          "orderProductsActions.refund": { $exists: true, $ne: null },
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
        $lookup: {
          from: "products",
          localField: "productsId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "materials",
          localField: "material",
          foreignField: "_id",
          as: "materialDetails",
        },
      },
      { $unwind: "$materialDetails" },
      {
        $project: {
          clientId: 1,
          firstName: { $arrayElemAt: ["$clientDetails.firstName", 0] },
          lastName: { $arrayElemAt: ["$clientDetails.lastName", 0] },
          productName: "$productDetails.name",
          materialName: "$materialDetails.name",
          finalPrice: 1,
          refundDate: "$orderProductsActions.refundDate",
        },
      },
      {
        $group: {
          _id: null,
          refundDetails: {
            $push: {
              firstName: "$firstName",
              lastName: "$lastName",
              productName: "$productName",
              materialName: "$materialName",
              refundAmount: "$finalPrice",
              refundDate: "$refundDate",
            },
          },
          totalRefundAmount: {
            $sum: "$finalPrice",
          },
        },
      },
      {
        $project: {
          _id: 0,
          refundDetails: 1,
          totalRefundAmount: 1,
          totalRefunds: { $size: "$refundDetails" },
        },
      },
    ]);

    // return { refundDetails: refundDetails[0] };
    const { refundDetails: refundDetailsData, totalRefundAmount } =
      refundDetails[0] || {};
console.log("refundDetails :",refundDetails,"totalRefundAmount :",totalRefundAmount);
    // Retourne les variables distinctement
    return {
      refundDetails: refundDetailsData || [],
      totalRefundAmount: totalRefundAmount || 0,
      totalRefunds:refundDetailsData?.length||0
    };
  } catch (error) {
    console.log("Error folder statistic refund.js :", error);
    throw error;
  }
};
