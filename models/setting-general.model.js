const mongoose = require("mongoose");
const {Schema} = mongoose;
const settingGeneralSchema = new Schema({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyRight: String

},{
    timestamps: true
});

module.exports = mongoose.model("setting-general",settingGeneralSchema,"setting-general")