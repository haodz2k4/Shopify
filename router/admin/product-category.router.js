const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product-category.controller");
const multer  = require('multer')
const fileUpload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",fileUpload.single('thumbnail'),uploadCloud,controller.createPost);   
module.exports = router;