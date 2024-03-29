import Credit from "../../models/credit.model.js";
import { filterByYear } from "../../utils/filterByYear.js";

export const credit = async (year) => {
  try {
    const filter = filterByYear(year);
    // Requête pour obtenir le nombre total de crédits et leur montant total
    const totalCredits = await Credit.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Requête pour obtenir le nombre de crédits utilisés et leur montant total
    const usedCredits = await Credit.aggregate([
      {
        $match: { ...filter, isArchived: true },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Requête pour obtenir les détails des crédits utilisés
    const usedCreditDetails = await Credit.aggregate([
      {
        $match: { ...filter, isArchived: true },
      },
      {
        $lookup: {
          from: "clients", // Nom de la collection des clients
          localField: "clientId",
          foreignField: "_id",
          as: "clientDetails",
        },
      },
      {
        $unwind: "$clientDetails",
      },
      {
        $project: {
          _id: 0,
          firstName: "$clientDetails.firstName",
          lastName: "$clientDetails.lastName",
          usedAt: "$updatedAt",
          amount: 1,
        },
      },
    ]);

    // Requête pour obtenir le nombre de crédits en cours et leur montant total
    const activeCredits = await Credit.aggregate([
      {
        $match: { ...filter, isArchived: false },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Requête pour obtenir les détails des crédits en cours
    const activeCreditDetails = await Credit.aggregate([
      {
        $match: { ...filter, isArchived: false },
      },
      {
        $lookup: {
          from: "clients", // Nom de la collection des clients
          localField: "clientId",
          foreignField: "_id",
          as: "clientDetails",
        },
      },
      {
        $unwind: "$clientDetails",
      },
      {
        $project: {
          _id: 0,
          firstName: "$clientDetails.firstName",
          lastName: "$clientDetails.lastName",
          awardedAt: "$createdAt",
          amount: 1,
        },
      },
    ]);

    return {
      totalCredits: totalCredits[0] || { count: 0, totalAmount: 0 },
      usedCredits: usedCredits[0] || { count: 0, totalAmount: 0 },
      usedCreditDetails,
      activeCredits: activeCredits[0] || { count: 0, totalAmount: 0 },
      activeCreditDetails,
    };
  } catch (error) {
    console.log("Error folder statistic credit.js :", error);
    throw error;
  }
};
