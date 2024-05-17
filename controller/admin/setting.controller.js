//require model here 
const settingGeneral = require("../../models/setting-general.model");
//[GET] "/admin/setting/general"
module.exports.general = async (req,res) =>{
    if(!res.locals.localRoles.permissions.includes("general_view")){
        res.render("admin/layouts/access-deny.pug");
        return;
    }
    const recordSetting = await settingGeneral.findOne({});
    res.render("admin/pages/settings/general.pug",{
        recordSetting: recordSetting
    });
}
//[PATCH] "/admin/setting/general"
module.exports.generalPatch = async (req,res) =>{
    const existsSetting = await settingGeneral.findOne({});
    if(existsSetting){
        await settingGeneral.updateOne({
            _id: existsSetting.id
        },req.body)
    }else{
        const recordSetting = new settingGeneral(req.body);
        await recordSetting.save();
    }
    res.redirect("back");
}