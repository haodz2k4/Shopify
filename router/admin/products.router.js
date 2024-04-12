const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");

router.get("/",controller.index);
router.patch("/change-multi", controller.changeMulti);

module.exports = router;