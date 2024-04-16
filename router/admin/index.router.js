const dashboardRouter = require("./dashboard.router");
const productRouter = require("./products.router");
const productCategoryRouter = require("./product-category.router");
const roleRouter = require("./role.router");
module.exports = (app) =>{
    app.use("/admin/dashboard",dashboardRouter);
    app.use("/admin/products",productRouter);
    app.use("/admin/product-category",productCategoryRouter);
    app.use("/admin/roles",roleRouter);
}   