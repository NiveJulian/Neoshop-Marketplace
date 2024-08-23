const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const storeRoutes = require("./storeRoutes");
const loginRoutes = require("./loginRoutes");
const fakeApi = require("../utils/montarBaseDeDatos");
const categoryRoutes = require("./categoryRoutes");
const brandRoutes = require("./brandRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");
const payingRoutes = require("./payingRoutes");
const payPalRouter = require("./payPalRoutes");
const mailsRoutes = require("./mailsRoutes");
const favoritesRoutes = require("./favoritesRoutes");

//fakes stores
const montarStores = require("../utils/montarStores");
const reviewRoutes = require("./reviewRoutes");
router.use("/fakesStores", montarStores);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/store", storeRoutes);
router.use("/login", loginRoutes);
router.use("/category", categoryRoutes);
router.use("/brand", brandRoutes);
router.use("/images", imagesRoutes);
router.use("/paying", payingRoutes);
router.use("/paypal", payPalRouter);
router.use("/", fakeApi);
router.use("/mails", mailsRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/cart", cartRoutes);
router.use("/paypal", payPalRouter); // Las rutas de PayPal
router.use("/review", reviewRoutes);

module.exports = router;
