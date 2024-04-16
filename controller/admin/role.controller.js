//require database here
const roles = require("../../models/role.model");

//[GET] /admin/roles

module.exports.index = async (req,res) =>{
    const record = await roles.find({});
    res.render("admin/pages/roles/index.pug",{
        roles: record
    })
}
//[GET] /admin/roles/create
module.exports.create = (req,res) =>{
    res.render("admin/pages/roles/create.pug");
}
//[POST] /admin/roles/create 
module.exports.createPost = async (req,res) =>{

    try {
        const record = new roles(req.body);
        await record.save();
        req.flash('sucess','Thêm mới nhóm quyền thành công ')
    } catch (error) {
        console.log(error);
        req.flash('error','Thêm mới Nhóm quyền thất bại')
    }
    res.redirect("/admin/roles");
}
//[GET] /admin/roles/edit/:id
module.exports.edit = async (req,res) =>{
    const id = req.params.id;
    const record = await roles.findById({
        _id: id
    })
    res.render("admin/pages/roles/edit.pug",{
        roles: record
    })
}
//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req,res) =>{

    try {
        await roles.updateOne({
            _id: req.params.id
        }, req.body)
        req.flash('sucess','Cập nhật thành công')
    } catch (error) {
        console.log(error);
        req.flash('error','Cập nhật thất bại')
    }
    res.redirect("/admin/roles");
}
//[DELETE] /admin/roles/delete/:id
module.exports.delete = async (req,res) =>{
    try {
        await roles.deleteOne({
            _id: req.params.id
        })
        req.flash('sucess','Xóa sản phẩm thành công')
    } catch (error) {
        console.log(error);
        req.flash("error","Xóa sản phảm thất bại");
    }
    res.redirect("back");
}
//[GET] /admin/roles/permissions 
module.exports.permission = async (req,res) =>{

    const record = await roles.find({});
    res.render("admin/pages/roles/permission.pug",{
        roles: record
    })
}
//[PATCH] /admin/roles/permissions
module.exports.permissionPatch = async (req,res) =>{
    
    try {
        const JsonRole = JSON.parse(req.body.roles);
        for(const item of JsonRole){
            await roles.updateOne({
                _id: item.id
            },{
                permissions: item.permissions
            })
        }
        req.flash('sucess','Cập nhật thành công')
    } catch (error) {
        console.log(error);
        req.flash('error','Cập nhật thất bại')
    }
    res.redirect("back");
}
