import Giftcard from "../models/giftcard.model.js";

const findOne = async (query) => {
  return await Giftcard.findOne(query).lean();
};

export default {
  findOne,
};
