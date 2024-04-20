const mongoose = require("mongoose");
const {Schema} = mongoose;

const newSchema = new Schema({
    title: String,
    content: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: String,
    
},{
    timestamps: true
})

module.exports =  mongoose.model("new",newSchema,"news");