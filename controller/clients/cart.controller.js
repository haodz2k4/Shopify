//require model here
const cart = require("../../models/cart.model");
const products = require("../../models/product.model")
//[GET] "/cart"
module.exports.index = async (req,res) =>{
    if(!res.locals.user){
        res.redirect("/user/login")
        return;
    }
    const recordCart = await cart.findOne({_id: req.cookies.cartId});
    let totalPrice = 0;
    for (const item of recordCart.products) {
        const inforProducts = await products.findOne({
            _id: item.productId
        }).select("-description")
        
        item.inforProducts = inforProducts
        item.inforProducts.priceNew = item.inforProducts.price * (100 - item.inforProducts.discountPercentage)/100;
        item.sum = item.inforProducts.priceNew * item.quantity;
        totalPrice += item.sum;
        
    }
    res.render("clients/pages/cart/index.pug",{
        cart: recordCart,
        totalPrice: totalPrice
    });
}
//[POST] "/cart/addPost/:id"
module.exports.addPost = async (req,res) =>{
    if(!res.locals.user){
        res.redirect("/user/login");
        return;
    }
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
//[GET] "/cart/delete/:id"
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    
    try {
        await cart.updateOne(
            { _id: req.cookies.cartId },
            { $pull: { products: { productId: id } } }
        );
        req.flash('success', 'Xóa sản phẩm khỏi giỏ hàng thành công');
    } catch (error) {
        req.flash('error', 'Xóa sản phẩm khỏi giỏ hàng thất bại');
        console.log(error);
    }
    
    res.redirect("back");
}
//[GET] "/cart/update/:quantity/:productId"
module.exports.update = async (req,res) =>{
    const cartId = req.cookies.cartId;
    const id = req.params.productId;
    const quantity = req.params.quantity;
    try {
        await cart.updateOne({
            _id: cartId,
            "products.productId": id 
        },{
            $set: { "products.$.quantity": quantity}
        })

    } catch (error) {
        
    }
    res.redirect("back");
}

