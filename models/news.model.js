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
    thumbnail: String,
    liked: [
        {
            userId: { type: String, required: true},
            dateLike: { type: Date, default: Date.now }
        }
    ],
    comment: [{
        
            userId: { type: String, required: true},
            content: String,
            dateComment: { type: Date, default: Date.now }
        
    }],
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