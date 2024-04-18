//require database here
const account = require("../../models/account.model");
const md5 = require("md5");
//[GET] /admin/auth/login
module.exports.login = (req,res) =>{
    res.render("admin/pages/auth/login.pug")
}
//[POST] /admin/auth/login 
module.exports.loginPost = async (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    const existsUser = await account.findOne({
        email: email,
        deleted: false
    })
    if(!existsUser){
        req.flash('error','Email không tồn tại');
        res.redirect("back")
        return;
    }
    if(existsUser.password != md5(password)){
        req.flash('error','Nhập sai mật khẩu')
        res.redirect("back")
        return;
    }
    if(existsUser.status === "inactive"){
        req.flash('error','Tài khoản đã bị khóa vui lòng liên hệ admin')
        res.redirect("back")
        return;
    }

    res.cookie("token",existsUser.token);
    res.redirect("/admin/dashboard");
}
//[GET] /admin/auth/logout 
module.exports.logout = (req,res) =>{

    res.clearCookie("token");
    res.redirect("/admin/auth/login")
}