const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");

router.get("/",controller.index);
router.patch("/change-multi", controller.changeMulti);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/soft-delete/:id",controller.softDelete);
router.get("/garbage",controller.garbage);
router.delete("/garbage/delete-forever/:id",controller.deleteForever);
router.get("/create",controller.create);
router.post("/create",controller.createPost);
module.exports = router;