//require modelhere 
const settingGeneral = require("../../models/setting-general.model");
module.exports.settingGeneral = async (req,res, next) =>{
    const record = await settingGeneral.findOne({});

    res.locals.settingGeneral = record;
    next();
}