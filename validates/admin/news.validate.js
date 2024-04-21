const news = require("../../models/news.model");
module.exports.createPost = async (req,res, next) =>{
    
    if(!req.body.title){
        
        req.flash('error','Tiêu đề không được bỏ trống');
        res.redirect("back");
        return;
    }else if (req.body.title.length < 5){
        req.flash('error','Tiêu đề không được quá 5 ký tự');
        res.redirect("back");
        return;
    }
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        req.body.position = await news.countDocuments();
    }
    req.body.createdBy = res.locals.user.id;
    next();


}