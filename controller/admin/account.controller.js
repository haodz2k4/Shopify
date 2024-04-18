const roles = require("../../models/role.model");
const account = require("../../models/account.model");
//require md5 
const md5 = require('md5');
//require generate 
const generate = require("../../helpers/generate.helper");
//GET /admin/account
module.exports.index = async (req,res) =>{
    const record = await account.find({})
    for(const item of record){
        const role = await roles.findOne({
            _id: item.role_id,
            deleted: false
        })
        item.roleTitle = role.title;
    }
    res.render("admin/pages/accounts/index.pug",{
        accounts: record
    });
}
//[GET /admin/account/create
module.exports.create = async (req,res) =>{
    const record = await roles.find({deleted: false});
    res.render("admin/pages/accounts/create.pug",{
        role: record
    })
}
//[POST] /admin/account/create  
module.exports.createPost = async (req,res) =>{
    try {
        req.body.password = md5(req.body.password);
        req.body.token = generate.generateString(30);
        const record = new account(req.body);
        await record.save();
        req.flash('sucess','Thêm tài khoản mới thành công');
    } catch (error) {
        console.log(error);
        req.flash('error','Thêm tài khoản mới thất bại');
    }
    res.redirect("/admin/accounts")
}
//[GET] /admin/account/edit/:id
module.exports.edit = async (req,res) =>{
    const id = req.params.id;
    const role = await roles.find({});
    const record = await account.findById({
        _id: id
    })
    res.render("admin/pages/accounts/edit",{
        account: record,
        roles: role
    })
}
//[PATCH] /admin/account/edit/:id
module.exports.editPatch = async (req,res) =>{
    
   try {    
     if(req.body.password){
         req.body.password = md5(req.body.password);
     }else{
         delete req.body.password
     }
     await account.updateOne({
         _id: req.params.id
     },req.body)
     req.flash('sucess','Cập nhật thành công')
   } catch (error) {
    console.log(error);
    req.flash('sucess','Cập nhật thất bại');

   }
    res.redirect("/admin/accounts");
}