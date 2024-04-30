//require model here
const Cart = require("../../models/cart.model");
module.exports.cart = async (req,res, next) =>{

    if(!req.cookies.cartId){
        const record = new Cart();
        await record.save();
        res.cookie("cartId",record.id);
    }else{
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        })
        res.locals.miniCart = cart
    }
    
    next();
}