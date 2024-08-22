const { Router } = require("express");
const getAllBrands = require("../controllers/brandControllers/getAllBrands");
const createNewBrand = require("../controllers/brandControllers/createNewBrand");
const deleteBrandById = require("../controllers/brandControllers/deleteBrandById");
const updateBrandById = require("../controllers/brandControllers/updateBrandById");
const getBrandById = require("../controllers/brandControllers/getBrandById");

const brandRoutes = Router();

brandRoutes.get("/", async (req, res) => {
  try {
    const brandAll = await getAllBrands();
    res.status(200).json(brandAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para crear marca
brandRoutes.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Missing data" });
    }
    if (typeof name !== "string") {
      return res.status(400).json({ error: "The name must be an string" });
    }
    const brandAll = await createNewBrand({ name });
    res.status(200).json(brandAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para eliminar una  marca
brandRoutes.delete("/:idBrand", async (req, res) => {
  try {
    const { idBrand } = req.params;
    if (!idBrand) {
      return res.status(400).json({ error: "Missing data" });
    }
    // Validar que idUser sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idBrand)) {
      return res
        .status(400)
        .json({ error: "The user id must be a valid UUID." });
    }
    const deleteBrand = await deleteBrandById({ idBrand });
    res.status(200).json(deleteBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para actualizar una  marca
brandRoutes.post("/update/", async (req, res) => {
  try {
    const { idBrand, newName } = req.body;

    if (!idBrand || !newName) {
      return res.status(400).json({ error: "Missing data" });//verificamos que no hayan datos faltantes
    }
    // Validar que idBrand sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idBrand)) {
      return res
        .status(400)
        .json({ error: "The user id must be a valid UUID." });
    }
    if (typeof newName !== "string") {
      return res.status(400).json({ error: "newName must be an string" });//verificamos que name sea un string
    }
    const updatedBrand = await updateBrandById({ idBrand, newName });
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Ruta para traer una marca por id
brandRoutes.get("/:idBrand", async (req, res) => {
  try {
    const { idBrand } = req.params;
    if (!idBrand) {
      res.status(400).json({ error: "Missing data" });
    }
    // Validar que idUser sea un UUID válido
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    if (!uuidPattern.test(idBrand)) {
      return res
        .status(400)
        .json({ error: "The user id must be a valid UUID." });
    }
    const theBrand = await getBrandById({ idBrand });
    res.status(200).json(theBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = brandRoutes;
