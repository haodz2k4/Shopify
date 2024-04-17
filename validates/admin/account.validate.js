const account = require("../../models/account.model");
module.exports.createPost = async (req,res,next) =>{
    if(!req.body.fullName){
        req.flash('error','Tên không được bỏ trống');
        res.redirect("back")
        return;
    }else if(req.body.fullName.length < 5){
        req.flash('error','Tên phải hơn 5 ký tự ');
        res.redirect("back")    
        return;
    }else if(req.body.password.length < 5){
        req.flash('error','Password phải hơn 5 ký tự');
        res.redirect("back");
        return;
    }
    
    const existsEmail = await account.findOne({
        email: req.body.email});
    if(existsEmail){
        req.flash('error','Email đã tồn tại');
        res.redirect("back")
        return;
    }
    next();
}
module.exports.editPatch = async (req,res,next) =>{
    if(!req.body.fullName){
        req.flash('error','Tên không được bỏ trống');
        res.redirect("back")
        return;
    }else if(req.body.fullName.length < 5){
        req.flash('error','Tên phải hơn 5 ký tự ');
        res.redirect("back")    
        return;
    }
    const id = req.params.id;

    const existsEmail = await account.findOne({
        _id: {$ne: id},
        email: req.body.email});
    if(existsEmail){
        req.flash('error','Email đã tồn tại');
        res.redirect("back")
        return;
    }
    next();
}