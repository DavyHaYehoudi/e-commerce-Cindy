import Promocode from "../models/promocode.model.js";

const findOne = async (query) => {
  return await Promocode.findOne(query);
};

export default {
  findOne,
};
