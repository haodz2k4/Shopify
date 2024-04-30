//require model here
const cart = require("../../models/cart.model");
const products = require("../../models/product.model")
//[GET] "/cart"
module.exports.index = async (req,res) =>{
    const recordCart = await cart.findOne({_id: req.cookies.cartId});
    for (const item of recordCart.products) {
        const inforProducts = await products.findOne({
            _id: item.productId
        }).select("-description")
        
        item.inforProducts = inforProducts
        item.inforProducts.priceNew = item.inforProducts.price * (100 - item.inforProducts.discountPercentage)/100;
        item.sum = item.inforProducts.priceNew * item.quantity;
        
    }
    res.render("clients/pages/cart/index.pug",{
        cart: recordCart
    });
}
//[POST] "/cart/addPost/:id"
module.exports.addPost = async (req,res) =>{
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    try {
        const recordCart = await cart.findOne({_id: req.cookies.cartId});
        const productExists = recordCart.products.find(item => item.productId === productId)
        if(productExists != null){
            const updateQuantity = quantity + productExists.quantity;
            const findIndex = recordCart.products.findIndex(item => item.productId === productId);
            const updateProducts = [...recordCart.products];
            updateProducts[findIndex].quantity = updateQuantity;
            await cart.updateOne({
                _id: req.cookies.cartId
            },{
                products: updateProducts
            })
        }else{
            await cart.updateOne({
                _id: req.cookies.cartId
            },{
                $push: {products: {productId: productId, quantity: quantity}}
                
            })
        }
        
        
        req.flash('success','Thêm sản phẩm vào giỏ hàng thành công')
    } catch (error) {
        req.flash('error','Thêm sản phẩm vào giỏ hàng thất bại');
        console.log(error);
    }

    res.redirect("back");
}

