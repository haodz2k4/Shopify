const mongoose = require("mongoose");
const {Schema} = mongoose;
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);  
const productSchema = new Schema({
    title: String,
    product_category_id: String,
    slug: { type: String, slug: "title" },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
    deletedAt: Date,
    deletedBy: String,
    updatedBy: String,
    comments: [
        {
            _id: String,
            rating: Number,
            content: String,
            dateSend: Date
        }
    ],
    featured: {
        type: String,
        default: "0"
    },
    deleted: {
        type: Boolean,
        default: false
    },

    
},{
    timestamps: true
})

module.exports = mongoose.model("product",productSchema,"products")