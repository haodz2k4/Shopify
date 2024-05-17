//require model here 
const order = require("../../models/order.model");
const products = require("../../models/product.model");
const user = require("../../models/user.model");
const feedback = require("../../models/feedback.models");
const cart = require("../../models/cart.model");
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
    const objectUser = {
        userId: res.locals.user.id,
        fullName: res.locals.user.fullName,
        phone: res.locals.user.phone,
        address: res.locals.user.address[res.locals.user.defaultAddressIndex]
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
    for(const item of listProducts){
        await cart.updateOne({
            _id: res.locals.miniCart.id
        },{
            $pull: {products: {productId: item.productId}}
        })
    }
    
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

//[POST] "/checkout/feedback"
module.exports.feedbackPost = async (req,res) =>{
        const record = new feedback({
            userId: res.locals.user.id,
            productId: req.body.productId,
            rating: req.body.rating,
            comment: req.body.comment
        })
        await record.save();
        req.flash('success','Thêm Bình Luận Thành Công');
        
        res.redirect("/");
}
//[GET] "/checkout/order/detail/:orderId"
module.exports.orderDetail = async (req,res) =>{
    const orderId = req.params.orderId;
    const record = await order.findOne({
        _id: orderId
    })
    for(const item of record.products){
        item.infoProducts = await products.findOne({_id: item.productId});
        
    }
    res.render("clients/pages/checkout/orderDetail.pug",{
        order: record
    })
}