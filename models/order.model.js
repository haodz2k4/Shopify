const mongoose = require("mongoose");
const {Schema} = mongoose;
const orderSchema = new Schema({
    cartId: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    products: [
        {
            productId: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model("order",orderSchema,"orders");