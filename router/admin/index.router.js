const dashboardRouter = require("./dashboard.router");
const productRouter = require("./products.router");

module.exports = (app) =>{
    app.use("/admin/dashboard",dashboardRouter);
    app.use("/admin/products",productRouter);
}   