const { user } = require("../../db.js");

const getUsers = async () => {
  const allUsers = await user.findAll();
  return allUsers;
};

module.exports = getUsers;
