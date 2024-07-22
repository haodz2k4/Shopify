const mongoose = require("mongoose"); 
const Inventory = require("./inventory.model");
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

productSchema.post("save",async function(doc) { 

    const inventory = new Inventory({
        product_id: doc._id,
        quantity: 0
    }) 
    await inventory.save();

})

module.exports = mongoose.model("product",productSchema,"products")