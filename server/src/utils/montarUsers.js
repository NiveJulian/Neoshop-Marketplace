const datosUser = require("./datosUser");
const postUser = require("../controllers/userControllers/postUser");
const {user} = require("../db.js");

module.exports = async () => {
    await datosUser.forEach(async (theUser) => {
        await user.create(theUser);
  });
  console.log("Datos de usuarios montados en la BD");
};