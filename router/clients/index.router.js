const homeRouter = require("./home.router");
const productRouter = require("./products.router");
module.exports = (app) =>{
    app.use("/",homeRouter);
    app.use("/products",productRouter);  
}