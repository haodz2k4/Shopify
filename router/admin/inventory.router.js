const {Router} = require("express");

const router = Router();
const controller = require("../../controller/admin/inventory.controller");
router.get("/",controller.index);
router.post("/update",controller.update);
module.exports = router;