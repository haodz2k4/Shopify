const account = require("../../models/account.model");
module.exports.requireAuth = async (req,res, next) =>{
  

    const token = req.cookies.token
    if(!token){
        res.redirect("/admin/auth/login");
        return;
    }
    const isExists = await account.findOne({
        token: token
    })
    if(!isExists){
        res.redirect("/admin/auth/login");
        return;
    }
    next()
}