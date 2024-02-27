const express = require("express");
const { addProductToCart, getCartProducts } = require("../controllers/product");
const {
  validateCartForUser,
  requireSignIn,
  isUser,
} = require("../middlewares");
const router = express.Router();

router.post(
  "/user/product/add-to-cart",
  requireSignIn,
  isUser,
  validateCartForUser,
  addProductToCart
);
router.get(
  "/user/product/get-cart-products",
  requireSignIn,
  isUser,
  getCartProducts
);

module.exports = router;
