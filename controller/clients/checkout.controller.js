//require model here 
const order = require("../../models/order.model");
const products = require("../../models/product.model");
const user = require("../../models/user.model");
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
//[POST] "/checkout/order"
module.exports.order = async (req,res) =>{
    const listOrder = JSON.parse(req.body.listOrder);
    const infoUser = await user.findOne({
        tokenUser: req.cookies.tokenUser
    })
    const objectUser = {
        fullName: infoUser.fullName,
        phone: infoUser.phone,
        address: infoUser.address[infoUser.defaultAddressIndex]
    }
    const listProducts = [];
    
    for(const item of listOrder){
        const [productId,quantity] = item.split("-");
        const recordProducts = await products.findOne({
            _id: productId
        });
        listProducts.push({
            productId: productId,
            price: recordProducts.price,
            discountPercentage: recordProducts.discountPercentage,
            quantity: quantity,

        })
        
    }
    
    const orderRecord = new order({
        cartId: req.cookies.cartId,
        userInfo: objectUser,
        products: listProducts
    });
    await orderRecord.save();
    res.redirect("/checkout/order/success/"+orderRecord.id)
}
//[GET] "/checkout/order/sucess/:orderId"
module.exports.success = async (req,res) =>{
    const orderId = req.params.orderId;
    const record = await order.findOne({
        _id: orderId
    })
    let totalPrice = 0;
    for(const item of record.products){
        const recordProducts = await products.findOne({
            _id: item.productId
        })
        recordProducts.priceNew = recordProducts.price * (100 - recordProducts.discountPercentage)/100;
        item.recordProducts = recordProducts
        item.total = (item.quantity * recordProducts.price)
        totalPrice += item.total;
    }


    res.render("clients/pages/checkout/success.pug",{
        order: record,
        totalPrice: totalPrice
    })
}