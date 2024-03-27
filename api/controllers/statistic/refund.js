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
          currentPrice: {
            $reduce: {
              input: "$productDetails.materials",
              initialValue: null,
              in: {
                $cond: {
                  if: { $eq: ["$$this._id", "$materialDetails._id"] },
                  then: "$$this.pricing.currentPrice",
                  else: "$$value",
                },
              },
            },
          },
          refundAmount: {
            $multiply: [
              "$orderProductsActions.refund",
              {
                $reduce: {
                  input: "$productDetails.materials",
                  initialValue: null,
                  in: {
                    $cond: {
                      if: { $eq: ["$$this._id", "$materialDetails._id"] },
                      then: "$$this.pricing.currentPrice",
                      else: "$$value",
                    },
                  },
                },
              },
            ],
          },
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
          totalRefunds: 1,
          refundDetails: 1,
          totalRefundAmount: 1,
        },
      },
    ]);

    // return { refundDetails: refundDetails[0] };
    const { refundDetails: refundDetailsData, totalRefundAmount } =
      refundDetails[0] || {};

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
