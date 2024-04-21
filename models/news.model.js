const mongoose = require("mongoose");
const {Schema} = mongoose;
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const newSchema = new Schema({
    title: String,
    content: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: String,
    position: Number,
    slug: {type: String, slug: "title", unique: true},
    deletedAt: Date,
    deletedBy: String,
    updatedBy: String,
    
},{
    timestamps: true
})

module.exports =  mongoose.model("new",newSchema,"news");