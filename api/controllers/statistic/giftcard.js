import Giftcard from "../../models/giftcard.model.js";

export const giftcard = async (year) => {
  try {
    let filter = {};

    if (year !== "-1") {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(parseInt(year, 10) + 1, 0, 1);
      filter.createdAt = { $gte: startDate, $lt: endDate };
    }
    // Nombre total de giftcards et total cumulé des montants (amount)
    const totalGiftcards = await Giftcard.countDocuments(filter);
    const totalAmountGiftcards = await Giftcard.aggregate([
      { $match: filter },
      { $group: { _id: null, totalAmountGiftcards: { $sum: "$amount" } } },
    ]);

    // Nombre de giftcards en cours de validité et le cumul des montants (amount)
    const validGiftcards = await Giftcard.countDocuments({
      ...filter,
      consumerId: null,
    });
    const totalAmountValidGiftcards = await Giftcard.aggregate([
      { $match: { ...filter, consumerId: null } },
      { $group: { _id: null, totalAmountValidGiftcards: { $sum: "$amount" } } },
    ]);

    // Liste des giftcards en cours de validité avec les détails de chaque client
    const validGiftcardsDetails = await Giftcard.aggregate([
      { $match: { ...filter, consumerId: null } },
      {
        $lookup: {
          from: "clients",
          localField: "buyerId",
          foreignField: "_id",
          as: "buyerDetails",
        },
      },
      { $unwind: "$buyerDetails" },
      {
        $project: {
          _id: 0,
          firstName: "$buyerDetails.firstName",
          lastName: "$buyerDetails.lastName",
          createdAt: 1,
          amount: 1,
        },
      },
    ]);

    // Nombre de giftcards utilisées et le cumul des montants (amount)
    const usedGiftcards = await Giftcard.countDocuments({
      ...filter,
      consumerId: { $ne: null },
    });
    const totalAmountUsedGiftcards = await Giftcard.aggregate([
      { $match: { ...filter, consumerId: { $ne: null } } },
      { $group: { _id: null, totalAmountUsedGiftcards: { $sum: "$amount" } } },
    ]);

    // Liste des giftcards utilisées avec les détails de chaque client
    const usedGiftcardsDetails = await Giftcard.aggregate([
      { $match: { ...filter, consumerId: { $ne: null } } },
      {
        $lookup: {
          from: "clients",
          localField: "consumerId",
          foreignField: "_id",
          as: "consumerDetails",
        },
      },
      { $unwind: "$consumerDetails" },
      {
        $project: {
          _id: 0,
          firstName: "$consumerDetails.firstName",
          lastName: "$consumerDetails.lastName",
          updatedAt: 1,
          amount: 1,
        },
      },
    ]);
    return {
      totalGiftcards,
      totalAmountGiftcards:
        totalAmountGiftcards.length > 0
          ? totalAmountGiftcards[0].totalAmountGiftcards
          : 0,
      validGiftcards,
      totalAmountValidGiftcards:
        totalAmountValidGiftcards.length > 0
          ? totalAmountValidGiftcards[0].totalAmountValidGiftcards
          : 0,
      validGiftcardsDetails,
      usedGiftcards,
      totalAmountUsedGiftcards:
        totalAmountUsedGiftcards.length > 0
          ? totalAmountUsedGiftcards[0].totalAmountUsedGiftcards
          : 0,
      usedGiftcardsDetails,
    };
  } catch (error) {
    console.log("Error folder statistic giftcard.js :", error);
    throw error;
  }
};
