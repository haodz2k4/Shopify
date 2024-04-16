const mongoose = require("mongoose");
const {Schema} = mongoose;
const RoleSchema = new Schema({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
},{
    timestamps: true
})

module.exports = mongoose.model("role",RoleSchema);