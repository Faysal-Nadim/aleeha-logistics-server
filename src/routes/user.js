const express = require("express");
const {
  registerUser,
  loginUser,
  sendVerificationCodeByEmail,
} = require("../controllers/user");
const { generateShippingMark, validateUser } = require("../middlewares");
const router = express.Router();

//Auth Routes For User
router.post("/auth/user/registration", generateShippingMark, registerUser);
router.post("/auth/user/login", loginUser);
router.get(
  "/auth/user/email/send-verification-code",
  validateUser,
  sendVerificationCodeByEmail
);

module.exports = router;
