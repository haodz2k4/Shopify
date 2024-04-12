//require model here 
const products = require("../../models/product.model");
//[GET] /admin/products
module.exports.index = (req,res) =>{
    const products = products.find({});
    res.render("admin/pages/products/index.pug",{
        products,
    });
}