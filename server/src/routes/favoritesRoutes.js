const { Router } = require("express");
const postFavorite = require("../controllers/favoritesControllers/postFavorite");
const deleteFavorite = require("../controllers/favoritesControllers/deleteFavorite");
const getAllFavoritesByUser = require("../controllers/favoritesControllers/getAllFavoritesByUser");
const favoritesRoutes = Router();

favoritesRoutes.post("/", async (req, res) =>{
    try {
        const {id_product, id_user} = req.body;
        const response = await postFavorite(id_product, id_user)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

favoritesRoutes.get("/:id_user", async (req, res) =>{
    try {
        const {id_user} = req.params;
        const response = await getAllFavoritesByUser(id_user)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

favoritesRoutes.delete("/", async (req, res) =>{
    try {
        const {id_product, id_user} = req.body;
        const response = await deleteFavorite(id_product, id_user)
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = favoritesRoutes;