//require model
const order = require("../../models/order.model");
//[GET] "/admin/order"
module.exports.index = async (req,res) =>{
    if(!res.locals.localRoles.permissions.includes("order_view")){
        res.render("admin/layouts/access-deny.pug");
        return;
    }
    const record = await order.find();
    for(const item of record){
        item.countProduct = item.products.length;
        let sum = 0;
        for(const product of item.products){
            sum += (product.price * (100 - product.discountPercentage)/100);
        }
        item.totalPrice = sum;
    }
    res.render("admin/pages/order/index.pug",{
        order: record
    })
}