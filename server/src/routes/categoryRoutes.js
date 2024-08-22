const { Router } = require("express");
const getAllCategory = require("../controllers/categoryControllers/getAllCategory");
const createCategory = require("../controllers/categoryControllers/createCategory");
const deleteCategoryById = require("../controllers/categoryControllers/deleteCategoryById");
const getCategoryById = require("../controllers/categoryControllers/getCategoryById");
const updateCategoryById = require("../controllers/categoryControllers/updateCategoryById");
const getCategoriesByUserId = require("../controllers/categoryControllers/getCategoriesByUserId");
const categoryRoutes = Router();

categoryRoutes.get("/", async (req, res) => {
  try {
    const categorysAll = await getAllCategory();
    res.status(200).json(categorysAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

categoryRoutes.post("/create", async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (typeof name !== "string") {
      return res.status(400).json({ error: "The name must be an string" });
    }
    const newCategory = await createCategory({ name, userId });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para eliminar una  categoria por id
categoryRoutes.delete("/:idCategory", async (req, res) => {
  try {
    const { idCategory } = req.params;
    if (!idCategory) {
      return res.status(400).json({ error: "Missing data" });
    }
    // Validar que idUser sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idCategory)) {
      return res
        .status(400)
        .json({ error: "The user id must be a valid UUID." });
    }
    const deleteCategory = await deleteCategoryById({ idCategory });
    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para traer una categoria por id
categoryRoutes.get("/:idCategory", async (req, res) => {
  try {
    const { idCategory } = req.params;
    if (!idCategory) {
      res.status(400).json({ error: "Missing data" });
    }
    // Validar que idCategory sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idCategory)) {
      return res
        .status(400)
        .json({ error: "The category id must be a valid UUID." });
    }
    const theCategory = await getCategoryById({ idCategory });
    res.status(200).json(theCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para crear marca
categoryRoutes.post("/update/", async (req, res) => {
  try {
    const { idCategory, newName } = req.body;

    if (!idCategory || !newName) {
      return res.status(400).json({ error: "Missing data" }); //verificamos que no hayan datos faltantes
    }
    // Validar que idCategory sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idCategory)) {
      return res
        .status(400)
        .json({ error: "The user id must be a valid UUID." });
    }
    if (typeof newName !== "string") {
      return res.status(400).json({ error: "newName must be an string" }); //verificamos que name sea un string
    }
    const updatedCategory = await updateCategoryById({ idCategory, newName });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para traer las categorias de un usuario
categoryRoutes.get("/categories/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const categories = await getCategoriesByUserId(userId);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = categoryRoutes;
