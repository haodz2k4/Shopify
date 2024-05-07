const mongoose = require("mongoose");
const {Schema} = mongoose;
const forgotPasswordSchema = new Schema({
    email: String,
    otp: String,
    expireAt: {type: Date, expires: 0}
},{
    timestamps: true
});
module.exports = mongoose.model("forgotPassword",forgotPasswordSchema,"forgot-password")