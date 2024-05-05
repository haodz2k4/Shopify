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
    try {
        const recordUser = new user(req.body);
        await recordUser.save();
        const recordCart = new cart({user_id: recordUser.id});
        await recordCart.save();
    } catch (error) {
        console.log(error);
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
