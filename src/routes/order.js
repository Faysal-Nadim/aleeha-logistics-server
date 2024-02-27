const express = require("express");
const { requireSignIn, isUser } = require("../middlewares");
const { generateInvoice } = require("../controllers/invoice");
const { placeOrderForUser, getUserOrder } = require("../controllers/order");
const router = express.Router();

router.post(
  "/order/user/place-order",
  requireSignIn,
  isUser,
  generateInvoice,
  placeOrderForUser
);
router.get("/order/user/get-order", requireSignIn, isUser, getUserOrder);

module.exports = router;
