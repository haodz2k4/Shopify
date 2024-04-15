const productCategory = require("../../models/product-category.model");
module.exports.createCategory = async (req,res,next) =>{
    if(req.body.title.length < 5){
        req.flash('error','Tiêu đề không được vượt quá 3 ký tự');
    }

    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        req.body.position = await productCategory.countDocuments();
    }
    next();
}