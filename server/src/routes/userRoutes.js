const { Router } = require("express");
const userRoutes = Router();
const postUser = require("../controllers/userControllers/postUser");
const getUsers = require("../controllers/userControllers/getUsers");
const getUserById = require("../controllers/userControllers/getUserById");
const modifyUser = require("../controllers/userControllers/modifyUser");
const forgotPassword = require("../controllers/userControllers/forgotPassword");
const resetPassword = require("../controllers/userControllers/resetPassword");

userRoutes.post("/", async (req, res) => {
  try {
    const {
      name,
      lastname,
      password,
      city,
      state,
      email,
      nro_document,
    } = req.body;
    const newUser = await postUser({
      name,
      lastname,
      password,
      city,
      state,
      email,
      nro_document,
    });
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.get("/", async (req, res) => {
  try {
    const allUsers = await getUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.get("/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const userData = await getUserById(idUser);
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.put("/update", async (req, res) => {
  try {
    const data = req.body;
    const userData = await modifyUser(data);
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.post("/forgot-password", async (req, res) => {
  try {
    const {email} = req.body;
    const response = await forgotPassword(email);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

userRoutes.post("/reset-password", async (req, res) => {
  try {
    const {password, token} = req.body;
    const userData = await resetPassword(password, token);
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = userRoutes;
