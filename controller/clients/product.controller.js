//require model here
const productCategory = require("../../models/product-category.model");
const products = require("../../models/product.model");
//[GET] "/products"
const product = require("../../models/product.model");
module.exports.index = async (req,res) =>{  
    const objectPagination = {
        currentPages: 1,
        limitPages: 16
    }
    
    if(req.query.pages){
        objectPagination.currentPages = parseInt(req.query.pages);
    }
    objectPagination.skipPages = (objectPagination.currentPages - 1) * objectPagination.limitPages;
    const record = await products.find({deleted: false, status: "active"}).sort({position: "desc"}).limit(objectPagination.limitPages).skip(objectPagination.skipPages);
    objectPagination.listPages = Math.ceil(await products.countDocuments({deleted: false,status: "active"}) / objectPagination.limitPages);
    res.render("clients/pages/products/index.pug",{
        product: record,
        objectPagination: objectPagination
    });
}
//[GET "/products/:slugCategory"
module.exports.category = async (req,res) =>{
    const recordProductCategory = await productCategory.findOne({deleted: false, status: "active",slug: req.params.slugCategory});
    
    const getSubCategory = async (parent_category) =>{
        const listSub = await productCategory.find({
            deleted: false,
            status: "active",
            parent_category: parent_category
        }).select("id")
        return listSub
    }
    const listSub = (await getSubCategory(recordProductCategory.id)).map(item => item.id);
    const recordProduct = await product.find({
        deleted: false,
        status: "active",
        product_category_id: {$in: [recordProductCategory.id, ...listSub]}
    })
    for(const item of recordProduct){
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
    }
    res.render("clients/pages/products/index.pug",{
        product: recordProduct
    });
}
//[GET] "products/detail/:slug"
module.exports.detail = async (req,res) =>{
    const record = await product.findOne({
        slug: req.params.slug
    })
    record.priceNew = record.price * (100 - record.discountPercentage)/100;
    res.render("clients/pages/products/detail.pug",{
        productDetail: record
    })
}