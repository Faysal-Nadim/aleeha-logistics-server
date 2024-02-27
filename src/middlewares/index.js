const User = require("../models/user");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");

exports.generateShippingMark = (req, res, next) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 4) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  req.shippingMark = result;
  next();
};

exports.validateUser = (req, res, next) => {
  User.findOne({ email: req.query.email }).exec((error, user) => {
    if (user) {
      next();
    } else {
      return res.status(404).json({ msg: "User Not Found." });
    }
  });
};

exports.validateCartForUser = (req, res, next) => {
  Product.findOne({ user: req.user._id, pid: req.body.pid }).exec(
    (error, product) => {
      if (product) {
        return res
          .status(403)
          .json({ msg: "Product Is Already In Your Cart." });
      }
      if (error) {
        return res.status(400).json({ msg: "Something Went Wrong." });
      } else {
        next();
      }
    }
  );
};

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(401).json({ message: "Authorization Required" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin Access Denied" });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user.role === "user" && req.user.type === "customer") {
    next();
  } else {
    return res.status(403).json({ message: "User Access Denied" });
  }
};
