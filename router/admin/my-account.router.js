const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/my-account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const multer  = require('multer')
const upload = multer()
router.get("/",controller.index);
router.get("/edit", controller.edit);
router.patch("/edit",upload.single('avatar'),uploadCloud,controller.editPatch)
module.exports = router;