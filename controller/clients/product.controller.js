//require model here
const productCategory = require("../../models/product-category.model");
const products = require("../../models/product.model");
//[GET] "/products"
const product = require("../../models/product.model");
module.exports.index = async (req,res) =>{  
    const find = {
        deleted: false
    }
    //handle pagination 
    const objectpagination = {
        currentPage: 1,
        limit: 9
    }
    if(req.query.page){
        objectpagination.currentPage = parseInt(req.query.page);
    }
    objectpagination.skip = (objectpagination.currentPage - 1) * objectpagination.limit;
    objectpagination.total = Math.ceil(await product.countDocuments({deleted: false}) / objectpagination.limit);
    //handle keyword here   
    if(req.query.keyword){
        const regrex = new RegExp(req.query.keyword);
        find.title = regrex;
    }
    const sort = {

    };
    //handle sorting here
    if(req.query.keySort && req.query.valueSort){
        sort[req.query.keySort] = req.query.valueSort
    }else{
        sort.position = "desc"
    }
    const record = await product.find(find).limit(objectpagination.limit).skip(objectpagination.skip).sort(sort);
    res.render("clients/pages/products/index.pug",{
        product: record,
        pagination: objectpagination
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