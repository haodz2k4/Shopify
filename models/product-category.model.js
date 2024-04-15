const mongoose = require("mongoose");
const {Schema} = mongoose;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new Schema({
    title: String,
    parent_category: {
        type: String,
        default: "" 
    },
    description: String,
    thumbnail: String,
    position: Number,
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: { type: String, slug: "title" }

},{
    timestamps: true
});

module.exports = mongoose.model("product-category",productCategorySchema);