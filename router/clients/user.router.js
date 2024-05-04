const express = require("express");
const router = express.Router();
const controller = require("../../controller/clients/user.controller");
//require validaets 
const userValidates = require("../../validates/clients/user.validate");
router.get("/login",controller.login);
router.get("/register",controller.register);
router.post("/register",userValidates.register,controller.registerPost);
router.post("/login",userValidates.login,controller.loginPost)

module.exports = router;