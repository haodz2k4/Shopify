const mongoose = require("mongoose");
const {Schema} = mongoose;
const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: String,
    phone: String,
    avatar: String,
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
})

module.exports = mongoose.model("user",userSchema,"users")