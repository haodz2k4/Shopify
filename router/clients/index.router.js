const homeRouter = require("./home.router");
const productRouter = require("./products.router");
//require cateogry here
const productCategory = require("../../middlewares/clients/category.middleware");
module.exports = (app) =>{
    app.use(productCategory.category)
    app.use("/",homeRouter);
    app.use("/products",productRouter);  
}