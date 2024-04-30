//require model here
const Cart = require("../../models/cart.model");
module.exports.cart = async (req,res, next) =>{

    if(!req.cookies.cartId){
        const record = new Cart();
        await record.save();
        res.cookie("cartId",record.id);
    }
    next();
}