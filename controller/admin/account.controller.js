const roles = require("../../models/role.model");
const account = require("../../models/account.model");
//require md5 
const md5 = require('md5');
//require generate 
const generate = require("../../helpers/generate.helper");
//GET /admin/account
module.exports.index = (req,res) =>{
    res.render("admin/pages/accounts/index.pug");
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