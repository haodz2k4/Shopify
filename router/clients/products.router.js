const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/product.controller");

router.get("/",controller.index);
router.get("/:slugCategory",controller.category)
router.get("/detail/:slug",controller.detail);
module.exports = router;