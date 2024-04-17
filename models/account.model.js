const mongoose = require("mongoose");
const {Schema} = mongoose;
const accountSchema = new Schema({
    fullName: String,
    Email: String,
    password: String,
    token: String,
    phone: String, 
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true
})

module.exports = mongoose.model("account",accountSchema,"accounts");