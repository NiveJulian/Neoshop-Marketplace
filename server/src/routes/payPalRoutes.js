const { Router } = require("express");
const { createOrder, captureOrder } = require("../controllers/paypalController");

const payPalRouter = Router();

payPalRouter.post("/create-order", createOrder);

payPalRouter.post("/capture-order/:orderId", captureOrder);


module.exports = payPalRouter;