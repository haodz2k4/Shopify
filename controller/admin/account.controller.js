//GET /admin/account
module.exports.index = (req,res) =>{
    res.render("admin/pages/accounts/index.pug");
}
//[GET /admin/account/create
module.exports.create = (req,res) =>{
    res.render("admin/pages/accounts/create.pug")
}