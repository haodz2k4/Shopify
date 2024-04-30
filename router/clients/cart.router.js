const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/cart.controller")
router.post("/add/:productId",controller.addPost);
router.get("/",controller.index);
router.get("/delete/:id",controller.delete);
router.get("/update/:quantity/:productId",controller.update);
module.exports = router;