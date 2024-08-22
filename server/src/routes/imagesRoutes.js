const { Router } = require("express");
const uploadToS3 = require("../controllers/imagesControllers/uploadImages");
const imagesRoutes = Router();

//Esta es la ruta para subir imagenes 
imagesRoutes.post("/upload", (req, res) => {
  uploadToS3(req, res);
});

module.exports = imagesRoutes;
