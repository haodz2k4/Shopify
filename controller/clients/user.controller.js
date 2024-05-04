//require model here
const md5 = require("md5");
const user = require("../../models/user.model");
const cart = require("../../models/cart.model");

//[GET] "/user/login"
module.exports.login = (req,res) =>{
    res.render("clients/pages/user/login.pug")
}
//[GET] "user/register"
module.exports.register = (req,res) =>{
    res.render("clients/pages/user/register.pug")
}
//[POST] "user/register"
module.exports.registerPost = async (req,res) =>{
    const recordUser = new user(req.body);
    await recordUser.save();
    req.flash('success','Đăng ký tài khoản thành công')
    res.redirect("/user/login");
}
//[POST] "user/login"
module.exports.loginPost = async (req,res) =>{
    const existsUser = await user.findOne({
        email: req.body.email,
        password: md5(req.body.password)
    });
    if(existsUser){
        res.cookie("tokenUser",existsUser.tokenUser);
        
        res.redirect("/")
        return; 
    }
    req.flash('error','Email hoặc mật khẩu không đúng')
    res.redirect("back");
}