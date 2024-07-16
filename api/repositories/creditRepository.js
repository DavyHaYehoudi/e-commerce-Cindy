import Credit from "../models/credit.model.js";

const findById = async (id) => {
  return await Credit.findById(id).lean();
};

export default {
  findById,
};
