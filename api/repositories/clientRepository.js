import Client from "../models/client.model.js";

const findById = async (id) => {
  return await Client.findById(id).lean();
};

export default {
  findById,
};
