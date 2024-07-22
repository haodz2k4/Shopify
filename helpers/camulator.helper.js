const inventory = require("../models/inventory.model");
module.exports.stock = async (product_id) =>{
    const quantity = await inventory.findOne({
        product_id: product_id
    });

    return quantity?.quantity
}