//require model here
const product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
//require helper here
const {formatCurrency} = require("../../helpers/formatCurrency.helper");
//[GET] "/"
module.exports.index = async (req,res) =>{
    
    const productFeatured = await product.find({
        featured: '1',
        status: "active",
        deleted: false
    }).limit(8);
    for(const item of productFeatured){
        item.price = formatCurrency(item.price);
        item.priceNew = formatCurrency((item.price * (100 - item.discountPercentage)/100).toFixed(0)); 
    }

    const productNews = await product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(6);
    for(const item of productNews){
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0); 
    }
    const productCategories = await ProductCategory.find({
        deleted: false,
        status: "active"
    })
    
    
    res.render("clients/pages/home/index.pug",{
        productFeatured: productFeatured,
        productNews: productNews,
        productCategories
    });
}