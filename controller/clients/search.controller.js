//require model here
const product = require("../../models/product.model");
//[GET] /search 
module.exports.index = async (req,res) =>{
    const keyword = req.query.keyword;
    const regrexKeyword = new RegExp(keyword,"i");
    const productRecord = await product.find({
        title: regrexKeyword,
        status: "active",
        deleted: false

    }) 
    res.render("clients/pages/search/index.pug",{
        keyword: keyword,
        productRecord: productRecord

    });
}