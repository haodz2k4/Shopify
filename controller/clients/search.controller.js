//require model here
const product = require("../../models/product.model");
const {formatCurrency} = require('../../helpers/formatCurrency.helper'); 
//[GET] /search 
module.exports.index = async (req,res) =>{
    const keyword = req.query.keyword;
    const regrexKeyword = new RegExp(keyword,"i");
    const productRecord = await product.find({
        title: regrexKeyword,
        status: "active",
        deleted: false

    });
    for(const item of productRecord){
        item.priceNew = formatCurrency(item.price * (100 - item.discountPercentage)/ 100);
    }
    res.render("clients/pages/search/index.pug",{
        keyword: keyword,
        products: productRecord

    });
}