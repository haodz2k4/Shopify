const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
//multer
const multer  = require('multer')
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/",controller.index);
router.patch("/change-multi", controller.changeMulti);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/soft-delete/:id",controller.softDelete);
router.get("/garbage",controller.garbage);
router.delete("/garbage/delete-forever/:id",controller.deleteForever);
router.get("/create",controller.create);
router.post("/create",upload.single('thumbnail'),uploadCloud,validate.createPost,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('thumbnail'),uploadCloud,controller.editPatch);
router.get("/detail/:id",controller.detail);
router.patch("/garbage/restore/:id",controller.restore);
module.exports = router;