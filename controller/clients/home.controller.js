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
    console.log(productFeatured);
    res.render("clients/pages/home/index.pug",{
        product: productFeatured
    });
}