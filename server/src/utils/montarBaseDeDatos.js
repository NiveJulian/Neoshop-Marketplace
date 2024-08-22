const express = require('express');
const fakeApi = express.Router();
const postProduct = require("../controllers/productControllers/postProduct");
const datosProduct = require("./datosProduct");

fakeApi.post('', async (req, res) => {
  try {
    for (const prod of datosProduct) {
      await postProduct(prod);
    }
    res.status(200).json({ message: "Datos de la API externa guardados en la base de datos." });
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    res.status(500).json({ error: "Error al guardar los datos", details: error.message });
  }
});

module.exports = fakeApi;
