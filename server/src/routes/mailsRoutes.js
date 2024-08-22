const { Router } = require("express");
const prueba = require("../controllers/mailsControllers/prueba");
const mailRoutes = Router();

mailRoutes.post ("/", async (req, res) => {
    try {
        const {emailUser, message} = req.body;
        const mail = await prueba(emailUser, message);
        return res.status(200).json(mail);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = mailRoutes;