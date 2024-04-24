//require model here
const product = require("../../models/product.model");
//[GET] "/"
module.exports.index = async (req,res) =>{
    
    const productFeatured = await product.find({
        deleted: false,
        status: "active",
        featured: "1"
    }).limit(3).select('-description')
    for(const item of productFeatured){
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0); 
    }

    const productNews = await product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(6);
    for(const item of productNews){
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0); 
    }
    
    
    res.render("clients/pages/home/index.pug",{
        productFeatured: productFeatured,
        productNews: productNews
    });
}