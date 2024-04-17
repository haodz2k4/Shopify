const express = require("express");
const router = express.Router();
const multer  = require('multer')
const fileUpload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controller/admin/account.controller");
//require validate
const accountValidate = require("../../validates/admin/account.validate");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",fileUpload.single('avatar'),accountValidate.createPost,uploadCloud,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",fileUpload.single('avatar'),accountValidate.editPatch,uploadCloud,controller.editPatch);
module.exports = router;