const { store } = require("../../db.js");

const getStoreByUserId = async (id_user) => {
  try {
    const storeData = await store.findOne({ where: { id_user } });
    if (!storeData) {
      throw new Error("Store not found for the given user ID");
    }
    return storeData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getStoreByUserId;