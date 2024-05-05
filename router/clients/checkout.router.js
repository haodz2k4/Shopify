const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/checkout.controller");

router.get("/",controller.index);
router.post("/",controller.indexPost);
router.post("/order",controller.order);
router.get("/order/success/:orderId",controller.success)
module.exports = router;