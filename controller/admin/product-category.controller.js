//Require database here
const productCategory = require("../../models/product-category.model");
//require helper here
const helperCreatree = require("../../helpers/createTree.helper");
//[GET] /admin/product-category 
module.exports.index = async (req,res) =>{
    if(!res.locals.localRoles.permissions.includes("product-category_view")){
        res.render("admin/layouts/access-deny.pug")
        return;
    }
    const record = await productCategory.find({}).sort({position: 'desc'});
    
    res.render("admin/pages/product-category/index.pug",{
        productCategory: record
    });
}

//[GET] /admin/product-category/create
module.exports.create = async (req,res) =>{
    if(!res.locals.localRoles.permissions.includes("product-category_edit")){
        res.render("admin/layouts/access-deny.pug")
        return;
    }
    //handle create tree parent category here
    
    const record = await productCategory.find({});
    const newRecord = helperCreatree(record);
    res.render("admin/pages/product-category/create.pug",{
        listParent: newRecord
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
//[GET] /admin/product-category/edit/:id
module.exports.edit = async (req,res) =>{
    if(!res.locals.localRoles.permissions.includes("product-category_edit")){
        res.render("admin/layouts/access-deny.pug")
        return;
    }
    const id = req.params.id;
    const data = await productCategory.findById({
        _id: id
    })
    const record = await productCategory.find({})
    const newRecord = helperCreatree(record);
    res.render("admin/pages/product-category/edit",{
        listParent: newRecord,
        currentId: id,
        data: data
    })
} 
//[PATCH] /admin/product-category/:id
module.exports.editPatch = async (req,res) =>{
    try {
        await productCategory.updateOne({
            _id: req.params.id
        },req.body)
        req.flash('sucess','Cập nhật danh mục sản phẩm thành công')
    } catch (error) {
        req.flash('error','Cập nhật danh mục thất bại');
        console.log(error);
    }
    res.redirect("/admin/product-category");
}