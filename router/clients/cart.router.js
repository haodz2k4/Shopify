const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/cart.controller")
router.post("/add/:productId",controller.addPost);
router.get("/",controller.index)
module.exports = router;