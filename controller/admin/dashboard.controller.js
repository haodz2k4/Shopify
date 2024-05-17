//require model here
const Products = require("../../models/product.model");
const productCategory = require("../../models/product-category.model");
const account = require("../../models/account.model");
const user = require("../../models/user.model");
const news = require("../../models/news.model");
//[GET] /admin/dashboard
module.exports.index = async (req,res) =>{
    
    const statistis = {
        productCategory: {
            total: await productCategory.countDocuments({deleted: false}),
            active: await productCategory.countDocuments({status: "active",deleted: false}),
            inactive: await productCategory.countDocuments({status: "inactive",deleted: false})
        },
        products: {
            total: await Products.countDocuments({deleted: false}),
            active: await Products.countDocuments({status: "active",deleted: false}),
            inactive: await Products.countDocuments({status: "inactive",deleted: false})
        },
        account: {
            total: await account.countDocuments({deleted: false}),
            active: await account.countDocuments({status: "active",deleted: false}),
            inactive: await account.countDocuments({status: "inactive",deleted: false})
        },
        user: {
            total: await user.countDocuments({deleted: false,deleted: false}),
            active: await user.countDocuments({status: "active",deleted: false}),
            inactive: await user.countDocuments({status: "inactive",deleted: false})
        },
        news: {
            total: await news.countDocuments({deleted: false,deleted: false}),
            active: await news.countDocuments({status: "active",deleted: false}),
            inactive: await news.countDocuments({status: "inactive",deleted: false})
        }

    }
    res.render("admin/pages/dashboard/index.pug",{
        statistis: statistis
    });
}