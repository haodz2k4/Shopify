const homeRouter = require("./home.router");
const productRouter = require("./products.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");
const userRouter = require("./user.router");
const newRouter = require("./news.router");
//require middleware here
const productCategory = require("../../middlewares/clients/category.middleware");
const cart = require("../../middlewares/clients/cart.middleware");
const user = require("../../middlewares/clients/user.middleware");
module.exports = (app) =>{
    app.use(productCategory.category)
    app.use(cart.cart)
    app.use(user.user);
    app.use("/",homeRouter);
    app.use("/checkout",checkoutRouter)
    app.use("/products",productRouter);  
    app.use("/search",searchRouter);
    app.use("/cart",cartRouter);
    app.use("/user",userRouter);
    app.use("/news",newRouter);
    
}