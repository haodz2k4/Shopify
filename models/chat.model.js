const mongoose = require("mongoose");
const {Schema} = mongoose;
const chatSchema = new Schema({
    userId: String,
    content: String,
    //images: Array,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{ 
    timestamps: true
})

module.exports = mongoose.model("chat",chatSchema,"chats");