//require model here
const md5 = require("md5");
const user = require("../../models/user.model");
const cart = require("../../models/cart.model");
const forgotPassword = require("../../models/forgot-password.model");
//require helper 
const generateHelper = require("../../helpers/generate.helper");
const sendMailHelper = require("../../helpers/sendEmail.helper");
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
    try {
        const recordUser = new user(req.body);
        await recordUser.save();
        const recordCart = new cart({user_id: recordUser.id});
        await recordCart.save();
    } catch (error) {
        console.log(error);
    }
    sendMailHelper.sendEmail(req.body.email,'Đăng Ký Tài Khoản Thành Công','Chúc mừng bạn đăng ký tài khoản vào trang web Shopify')
    if (!emailResult.success) {
        req.flash('error', emailResult.message);
    } else {
        req.flash('success', 'Đăng ký tài khoản thành công');
    }
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
        const recordCart = await cart.findOne({
            user_id: existsUser.id
        })
        res.cookie("cartId",recordCart.id);
        res.redirect("/")
        return; 
    }
    req.flash('error','Email hoặc mật khẩu không đúng')
    res.redirect("back");
}
//[GET] "/user/profile"
module.exports.profile = async (req,res) =>{
    const recordUser = await user.findOne({
        tokenUser: req.cookies.tokenUser
    })
    
    res.render("clients/pages/user/profile.pug",{
        user: recordUser
    })
}
//[POST] "/user/profiles/address/add"
module.exports.addAddress= async (req,res) =>{
    const street = req.body.street;
    const city = req.body.city;
    const country = req.body.country;
   try {
     await user.updateOne({
         _id: res.locals.user.id
     },{
         $push: {address: {street: street,city: city,country: country}}
     })
   } catch (error) {
        console.log(error);
   }


    res.redirect("back");
}
//[get] "/user/profiles/address/update/:defaultAddress"
module.exports.update = async (req,res) =>{
    const defaultAddress = req.params.defaultAddress;
    
    try {
        await user.updateOne({
            _id: res.locals.user.id
        },{
            defaultAddressIndex: defaultAddress
        })
        req.flash('success','update địa chỉ thành công');
    } catch (error) {
        console.log(error);
        req.flash('error','update địa chỉ thất bại');
        
    }
    res.redirect("back");
}
//[GET] "/user/logout"
module.exports.logout = async (req,res) =>{
    res.clearCookie("tokenUser");
    res.clearCookie("cartId");
    res.redirect("/user/login")
}
//[GET] "user/password/forgot"
module.exports.forgotPassword = (req,res) =>{
    res.render("clients/pages/user/forgot-password")
}
//[POST] "user/password/forgot"
module.exports.forgotPasswordPost = async (req,res) =>{
    const email = req.body.email;
    const isExistsEmail = await user.findOne({
        email: email
    })
    if(!isExistsEmail){
        
        req.flash('error','Không tìm thấy địa chỉ Email');
        res.redirect("back");
        return;
    }
    //create otp and save to database 
    const objectPassword = {
        email: email,
        otp: generateHelper.generateRandomNumber(6),
        expireAt: Date.now() + 3*60*1000
    }
    const recordForgot = new forgotPassword(objectPassword);
    await recordForgot.save();
    //send code otp to email 
    sendMailHelper.sendEmail(email,'Lấy lại mật khẩu',`Mã Otp xác thực của bạn là ${objectPassword.otp}. hết hạn trong 3p`)
    res.redirect("/user/password/otp?email="+email);
}
//[GET] "user/password/otp"
module.exports.otpPassword = (req,res) =>{
    res.render("clients/pages/user/otp-password.pug",{
        email: req.query.email
    });
}
//[POST] "user/password/otp"
module.exports.otpPasswordPost = async (req,res) =>{
    const email = req.body.email;
    const otp = req.body.otp;
    const existsOtp = await forgotPassword.findOne({
        email:email,
        otp: otp

    })
    if(!existsOtp){
        req.flash('error','Otp không hợp lệ');
        res.redirect("back");
        return;
    }
    const recordUser = await user.findOne({
        email: email
    })
    res.cookie("tokenUser",recordUser.tokenUser);
    res.redirect("/user/password/reset");
}
//[GET] "user/password/reset"
module.exports.resetPassword = (req,res) =>{
    res.render("clients/pages/user/reset-password.pug")
}
//[POST] "user/password/reset"
module.exports.resetPasswordPost = async (req,res) =>{
    const password = req.body.password;
    const repeatPassword = req.body.confirmPassword;
    console.log(req.body.password);
    console.log(req.body.confirmPassword)
    if(password !== repeatPassword){
        req.flash('error','Xác thực mật khẩu không đúng');
        res.redirect("back");
        return;
    }
    await user.updateOne({
        tokenUser: req.cookies.tokenUser
    },{
        password: md5(password)
    })
    res.redirect("/");
}
//[GET] "user/profiles/edit"
module.exports.edit = (req,res) =>{
    res.render("clients/pages/user/edit.pug")
}
