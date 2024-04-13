const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
//multer
const multer  = require('multer')
const upload = multer();
const middleWare = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/",controller.index);
router.patch("/change-multi", controller.changeMulti);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/soft-delete/:id",controller.softDelete);
router.get("/garbage",controller.garbage);
router.delete("/garbage/delete-forever/:id",controller.deleteForever);
router.get("/create",controller.create);
router.post("/create",upload.single('thumbnail'),middleWare,validate.createPost,controller.createPost);
module.exports = router;