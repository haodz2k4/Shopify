const {Schema, model, Types} = require("mongoose");
const inventorySchema = new Schema({
    product_id: String,
    quantity: Number,
    deleted: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
}) 

module.exports = model("inventory",inventorySchema);