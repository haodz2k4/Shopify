const homeRouter = require("./home.router");
const productRouter = require("./products.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");
//require middleware here
const productCategory = require("../../middlewares/clients/category.middleware");
const cart = require("../../middlewares/clients/cart.middleware");
module.exports = (app) =>{
    app.use(productCategory.category)
    app.use(cart.cart)
    app.use("/",homeRouter);
    app.use("/products",productRouter);  
    app.use("/search",searchRouter);
    app.use("/cart",cartRouter);
}