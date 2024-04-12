const mongoose = require("mongoose");
const {Schema} = mongoose;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);  
const productSchema = new Schema({
    title: String,
    slug: { type: String, slug: "title" },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    
},{
    timestamps: true
})

module.exports = mongoose.model("product",productSchema,"products")