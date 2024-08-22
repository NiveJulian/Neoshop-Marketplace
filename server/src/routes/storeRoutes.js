const { Router } = require("express");
const storeRoutes = Router();
const postStore = require("../controllers/storeControllers/postStore");
const getAllStores = require("../controllers/storeControllers/getAllStores");
const getStoreByName = require("../controllers/storeControllers/getStoreByName");
const { STRING } = require("sequelize");
const getStoreById = require("../controllers/storeControllers/getStoreById");
const getStoreByUserId = require("../controllers/storeControllers/getStoreByUserId");

//Postea una nueva tienda
storeRoutes.post("/", async (req, res) => {
    try {
      const {address_cp, address_country, address_city, name, logo, id_user} = req.body;
      const store = await postStore({address_cp, address_country, address_city, name, logo, id_user});
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Este es para traer una tienda por id
storeRoutes.get("/:idStore", async (req, res) => {
  try {
      const {idStore} = req.params;

      // Validar que idStore sea un UUID válido
      const uuidPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
      if (!uuidPattern.test(idStore)) {
          return res.status(400).json({ error: "Invalid parameter. It must be a valid UUID." });
      }
      
      //Si idStore es un UUID valido lo mandamos al controlador para traer la tienda
      const storeData = await getStoreById(idStore);
      return res.status(200).json(storeData );
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});

//Trae todas las tiendas
storeRoutes.get("/", async (req, res) => {
  try {
    const allStores = await getAllStores();
    res.status(200).json(allStores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Busca tiendas por nombre
storeRoutes.get("/name/:name", async (req, res) => {
  try {
      const {name} = req.params;

      // Verificación de que name es una cadena
      if (typeof name !== 'string') {
        return res.status(400).json({ error: "The 'name' parameter must be a string" });
      }

      // Verificación de que name no sea demasiado largo
      const nameSeparado = name.split('');
      if (nameSeparado.length > 20) {
        return res.status(400).json({ error: "The 'name' parameter is too long" });
      }

      // Verificación de que name no contenga caracteres no permitidos
      const validNamePattern = /^[a-zA-Z0-9\s+]*$/;
      if (!validNamePattern.test(name)) {
        return res.status(400).json({ error: "The 'name' parameter contains invalid characters" });
      }

      //Si pasa las validaciones lo mandamos a su controlador para buscar por nombre
      const searchResult = await getStoreByName(name);
      return res.status(200).json(searchResult);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});

storeRoutes.get("/user/:id_user", async (req, res) => {
  try {
    const { id_user } = req.params;
    const storeData = await getStoreByUserId(id_user);
    return res.status(200).json(storeData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = storeRoutes;
