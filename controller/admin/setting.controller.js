//[GET] "/admin/setting/general"
module.exports.general = async (req,res) =>{
    res.render("admin/pages/settings/general.pug");
}