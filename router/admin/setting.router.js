const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/setting.controller");
const multer  = require('multer')
const upload = multer();
const uploadCloudMiddleWare = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/general",controller.general);
router.patch("/general",upload.single('logo'),uploadCloudMiddleWare,controller.generalPatch);
module.exports = router;