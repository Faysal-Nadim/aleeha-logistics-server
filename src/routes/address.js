const express = require("express");
const { createAddress, getAddress } = require("../controllers/address");
const { isUser, requireSignIn } = require("../middlewares");
const router = express.Router();

router.post("/address/user/create", requireSignIn, isUser, createAddress);
router.get("/address/user/get", requireSignIn, isUser, getAddress);

module.exports = router;
