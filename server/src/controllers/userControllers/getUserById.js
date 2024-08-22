const { user } = require("../../db.js");

const getUserById = async (idUser) => {
  const userById = await user.findByPk(idUser);
  return userById;
};

module.exports = getUserById;
