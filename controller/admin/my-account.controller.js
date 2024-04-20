//[GET] /admin/my-account  
const roles = require("../../models/role.model"); 
module.exports.index = async (req,res) =>{
    const findRole = await roles.findOne({
        _id: res.locals.user.role_id
    })
   
    res.render("admin/pages/my-account/index.pug",{
        roles: findRole
    });
}
//[GET] /admin/my-account 
module.exports.edit = async (req,res) =>{
    const record = await roles.find({});
    res.render("admin/pages/my-account/edit.pug",{
        roles: record
    });
}
//[PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    
    const id = res.locals.user.role_id;
    try {
        await roles.updateOne({
            _id: id
        },req.body)
    } catch (error) {
        console.log(error);
    }
}