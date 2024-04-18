//require database here
const account = require("../../models/account.model");
const roles = require("../../models/role.model");
module.exports.requireAuth = async (req,res, next) =>{
  

    const token = req.cookies.token
    if(!token){
        res.redirect("/admin/auth/login");
        return;
    }
    const isExists = await account.findOne({
        token: token,
        deleted: false,
        status: "active"
    })
    if(!isExists){
        res.clearCookie("token");
        res.redirect("/admin/auth/login");
        return;
    }
    const roleRecord = await roles.findOne({_id: isExists.role_id});
    res.locals.user = isExists;  
    res.locals.localRoles = roleRecord;
    next()
}