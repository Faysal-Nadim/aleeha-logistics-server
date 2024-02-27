const Product = require("../models/product");

exports.addProductToCart = (req, res) => {
  const {
    title,
    image,
    link,
    vendor,
    pid,
    variations,
    shippingRate,
    shippingCategory,
  } = req.body;

  const _product = new Product({
    user: req.user._id,
    productNumber: `AL${Math.floor(10000000 + Math.random() * 90000000)}`,
    title,
    image,
    link,
    vendor,
    pid,
    variations,
    shippingRate,
    shippingCategory,
  });

  _product.save((error, product) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong", error });
    }
    if (product) {
      return res.status(201).json({ msg: "Item Added To Your Cart", product });
    } else {
      return res.status(400).json({ msg: "Bad Request" });
    }
  });
};

exports.getProductsForCart = (req, res) => {
  Product.find({ user: req.user._id, type: "cart" }).exec((error, products) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong" });
    }
    if (products) {
      return res.status(200).json({ msg: "success", cart: products });
    } else {
      return res.status.status(404).json({ msg: "Bad Request" });
    }
  });
};
