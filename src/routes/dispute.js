const express = require("express");
const { createDispute } = require("../controllers/dispute");
const router = express.Router();

router.post("/dispute/admin/create-dispute", createDispute);

module.exports = router;
