//require model here
const Cart = require("../../models/cart.model");
module.exports.cart = async (req,res, next) =>{
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })
    res.locals.miniCart = cart
    
    next();
}