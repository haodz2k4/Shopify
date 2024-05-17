//require model here
const products = require("../models/product.model");
module.exports = async (req) => {
    const maxPriceProduct = await products.find({deleted: false,status: "active"}).limit(1).sort({price: "desc"});
    const objectRangePrice = {
        minPrice: 0,
        maxPrice: maxPriceProduct[0].price
    }
    
    if(req.query.minPrice && req.query.maxPrice){
        objectRangePrice.minPrice = req.query.minPrice;
        objectRangePrice.maxPrice = req.query.maxPrice;
    }
    return objectRangePrice;
};