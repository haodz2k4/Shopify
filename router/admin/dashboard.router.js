const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/dashboard.controller");

router.get("/",controller.index);
router.post("/export-report",controller.exportReport);

module.exports = router;