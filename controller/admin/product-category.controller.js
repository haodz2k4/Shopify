//Require database here
const productCategory = require("../../models/product-category.model");
//[GET] /admin/product-category 
module.exports.index = async (req,res) =>{

    const record = await productCategory.find({});
    
    res.render("admin/pages/product-category/index.pug",{
        productCategory: record
    });
}

//[GET] /admin/product-category/create
module.exports.create = async (req,res) =>{

    const record = await productCategory.find({});
    res.render("admin/pages/product-category/create.pug",{
        listParent: record
    })
}
//[POST] /admin/product-category/create
module.exports.createPost = async (req,res) =>{

    const record = new productCategory(req.body);
    try {
        await record.save();
        req.flash('sucess','Them mới danh mục thành công')
    } catch (error) {
        req.flash('error','Thêm mới danh mục thất bại');
        console.log(error);
    }
    res.redirect("/admin/product-category");
}