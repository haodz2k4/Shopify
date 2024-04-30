//require model here
const Cart = require("../../models/cart.model");
//[GET] "/cart"
module.exports.addPost = async (req,res) =>{
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    try {
        const objectCart = {
            productId: productId,
            quantity: quantity
        }
        const cart = await Cart.findOne({
            _id: cartId
        })
        const productIdExists = cart.products.find(item => item.productId === productId);
        if(productIdExists){
            const quantityUpdate = productIdExists.quantity + quantity;
            await Cart.updateOne({
                _id: cartId,
                "products.productId": productId
            },{
               $set: { "products.$.quantity": quantityUpdate }
            })
        }else{
            await Cart.updateOne({
                _id: cartId
            },{
               $push: { products: objectCart}
            })
        }
        
        req.flash("success","Thêm sản phẩm vào giỏ hàng thành công")
    } catch (error) {
        req.flash("error","Thêm sản phẩm vào giỏ hàng thất bại");
        console.log(error);
    }
    res.redirect("back");
}