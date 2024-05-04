//require model here 
const order = require("../../models/order.model");
const products = require("../../models/product.model");
//[GET] "/checkout"
module.exports.index = (req,res) =>{
    res.render("clients/pages/checkout/index.pug")
}
//[POST] "/checkout"
module.exports.indexPost = async (req,res) =>{
    const infoCheckout = JSON.parse(req.body.infoCheckout);
    const listCheckout = [];
    let totalPrice = 0;
    for(const item of infoCheckout){
        const [productId,quantity] = item.split("-");
        const infoProducts = await products.findOne({
            _id: productId
        })
        infoProducts.priceNew = infoProducts.price * (100 - infoProducts.discountPercentage)/100;
        listCheckout.push({
            productId: productId,
            title: infoProducts.title,
            priceNew: infoProducts.priceNew,
            quantity: quantity,
            thumbnail: infoProducts.thumbnail,
            discountPercentage: infoProducts.discountPercentage,
            total: (quantity * infoProducts.priceNew)


        })
        totalPrice += (quantity * infoProducts.priceNew)
    }
    res.render("clients/pages/checkout/index.pug",{
        checkout: listCheckout,
        totalPrice: totalPrice
    })
}