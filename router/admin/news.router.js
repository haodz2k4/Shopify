const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/news.controller");
const validate = require("../../validates/admin/news.validate");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",validate.createPost,controller.createPost);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",controller.editPatch);
router.patch("/sort-delete/:id",controller.sortDelete);
router.get("/detail/:id",controller.detail)
module.exports = router;