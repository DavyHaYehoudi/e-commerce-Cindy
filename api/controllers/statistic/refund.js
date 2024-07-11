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
          let: { materialId: "$material" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$_id", "$$materialId"] },
                    { $eq: ["$_id", null] }
                  ]
                }
              }
            }
          ],
          as: "materialDetails",
        },
      },
      { $unwind: { path: "$materialDetails", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          clientId: 1,
          firstName: { $arrayElemAt: ["$clientDetails.firstName", 0] },
          lastName: { $arrayElemAt: ["$clientDetails.lastName", 0] },
          productName: "$productDetails.name",
          materialName: {
            $cond: {
              if: { $eq: ["$materialDetails", null] },
              then: { $arrayElemAt: ["$productDetails.materials.name", 0] },
              else: "$materialDetails.name",
            },
          },
          finalPrice: 1,
          refundDate: "$orderProductsActions.refundDate",
          refundAmount: { $multiply: ["$finalPrice", "$orderProductsActions.refund"] },
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
              refundAmount: "$refundAmount",
              refundDate: "$refundDate",
            },
          },
          totalRefundAmount: {
            $sum: "$refundAmount",
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

    const { refundDetails: refundDetailsData, totalRefundAmount } =
      refundDetails[0] || {};
    console.log("refundDetails :", refundDetails, "totalRefundAmount :", totalRefundAmount);

    return {
      refundDetails: refundDetailsData || [],
      totalRefundAmount: totalRefundAmount || 0,
      totalRefunds: refundDetailsData?.length || 0,
    };
  } catch (error) {
    console.log("Error folder statistic refund.js :", error);
    throw error;
  }
};
