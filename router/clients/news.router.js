const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/news.controller");
router.get("/",controller.index);
router.get("/like/remove/:id",controller.removeLike);
router.get("/like/add/:id",controller.addLike);
router.post("/comments/add/:newsId",controller.commentPost);
module.exports = router;