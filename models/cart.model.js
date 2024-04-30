const mongoose = require("mongoose");
const {Schema} = mongoose;
const cartSchema = new Schema({
    //user_id: String,
    products: [{
        productId: String,
        quantity: Number
    }]

},{
    timestamps: true
})

module.exports = mongoose.model("cart",cartSchema,"carts")