const dashboardRouter = require("./dashboard.router");
const productRouter = require("./products.router");
const productCategoryRouter = require("./product-category.router");
const roleRouter = require("./role.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const auth = require("../../middlewares/admin/auth.middleware");
module.exports = (app) =>{
    app.use("/admin/dashboard",auth.requireAuth,dashboardRouter);
    app.use("/admin/products",auth.requireAuth,productRouter);
    app.use("/admin/product-category",auth.requireAuth,productCategoryRouter);
    app.use("/admin/roles",auth.requireAuth,roleRouter);
    app.use("/admin/accounts",auth.requireAuth,accountRouter);
    app.use("/admin/auth",authRouter)
}   