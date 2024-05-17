//require model here
const user = require("../../models/user.model");

const generateString = require("../../helpers/generate.helper");
const sendMailHelper = require("../../helpers/sendEmail.helper");
const md5 = require("md5");
module.exports.register = async (req,res, next) =>{
    const existsUser = await user.findOne({
        email: req.body.email
    })
    if(req.body.fullName.length < 5){
        req.flash('error','Họ và tên không được dưới 5 ký tự');
        res.redirect("back");
        return;
    }else if(existsUser){
        req.flash('error','Email đã tồn tại');
        res.redirect("back");
        return;
    }else if(req.body.password !== req.body.repeatPassword){
        req.flash('error','Nhập lại mật khẩu không đúng');
        res.redirect("back");
        return;
    }
    const existsEmail = await sendMailHelper.sendEmail(req.body.email,'Đăng Ký Tài Khoản Thành Công','Chúc mừng bạn đăng ký tài khoản vào trang web Shopify');
    console.log(existsEmail);
    if (!existsEmail.success) {
        req.flash('error', existsEmail.message);
        return;
    } else {
        req.flash('success', 'Đăng ký tài khoản thành công');
    }
    req.body.password = md5(req.body.password);
    req.body.tokenUser = generateString.generateString(30);


    next();
}
module.exports.login = async (req,res, next) =>{

    if(!req.body.email){
        req.flash('error','Email không được bỏ trống');
        res.redirect("back");
        return;
    }
    
    next()
}