//require model here
const productCategory = require("../../models/product-category.model");
const products = require("../../models/product.model");
const order = require("../../models/order.model");
const feedback = require("../../models/feedback.models");
const user = require("../../models/user.model");
//require helper here
const paginationHelper = require("../../helpers/pagination.helper");
const rangePriceHelper = require("../../helpers/rangePrice.helper");
const sortedHelper = require("../../helpers/sorted.helper");
const {formatCurrency} = require("../../helpers/formatCurrency.helper");
const {stock} = require("../../helpers/camulator.helper")
//[GET] "/products"
module.exports.index = async (req,res) =>{  
    //handle price range here
    const objectRangePrice = await rangePriceHelper(req);
    //end range price
    const objPagination = await paginationHelper.objPagination(req);
    objPagination.listPages = Math.ceil(await products.countDocuments({deleted: false,status: "active"}) / objPagination.limitPages);
    const objectSorting = {}
    if(req.query.sortKey && req.query.sortValue){
            objectSorting[req.query.sortKey] = req.query.sortValue
    }else{
        objectSorting.position = 'desc'
    }

    if(req.query.sortKey == "sold" && req.query.sortValue == "desc"){
        objectSorting.sold = "desc"
    }
    //handle button sorted by 
   const objectButtonSorted = sortedHelper.products(req);
    

    const record = await products.find({deleted: false, status: "active", price: {$gte: objectRangePrice.minPrice, $lte: objectRangePrice.maxPrice}}).sort(objectSorting).limit(objPagination.limitPages).skip(objPagination.skipPages);
    //handle category here
    const recordProductCategory = await productCategory.find({deleted: false, status: "active"}); 
    for(const item of record){
        const countSold = await order.countDocuments({
            "products.productId": item.id
        })
        item.sold = countSold;
        item.newPrice = formatCurrency(item.price * (100 - item.discountPercentage)/100); 
        item.stock = (await stock(item.id) ? await stock(item.id) : 0)
       
    }
    if(req.query.sortKey === "sold" && req.query.sortValue === "desc"){
        record.sort((a, b) => b.sold - a.sold);
    }
    
    
    res.render("clients/pages/products/index.pug",{
        product: record,
        objectPagination: objPagination,
        productCategory: recordProductCategory,
        objectRangePrice: objectRangePrice,
        listButtonSorted: objectButtonSorted
    });
}
//[GET "/products/:slugCategory"
module.exports.category = async (req,res) =>{
    //handle price range here
    const objectRangePrice = await rangePriceHelper(req);
    const objPagination = await paginationHelper.objPagination(req);
    const category = await productCategory.findOne({deleted: false, status: "active",slug: req.params.slugCategory});
    const recordProduct = await products.find({deleted: false, status: "active",product_category_id: category.id,price: {$gte: objectRangePrice.minPrice, $lte: objectRangePrice.maxPrice}}).limit(objPagination.limitPages).skip(objPagination.skipPages);
    
    objPagination.listPages = Math.ceil(await products.countDocuments({deleted: false,status: "active", product_category_id: req.params.slugCategory}) / objPagination.limitPages);
    const objectButtonSorted = sortedHelper.products(req);
    
    for(const item of recordProduct){
        const countSold = await order.countDocuments({
            "products.productId": item.id
        })
        item.sold = countSold;
        item.newPrice = item.price * (100 - item.discountPercentage)/100;
       
    }
    res.render("clients/pages/search/index.pug",{
        products: recordProduct,
        objectPagination: objPagination,
        defaultCategory: category,
        objectRangePrice: objectRangePrice,
        listButtonSorted: objectButtonSorted
    });
}
//[GET] "products/detail/:slug"
module.exports.detail = async (req,res) =>{
    const record = await products.findOne({
        slug: req.params.slug
    })
    record.priceNew = record.price * (100 - record.discountPercentage)/100;
    record.stock = await (stock(record.id))
    const listFeedback = await feedback.find({productId: record.id});
    for(const item of listFeedback){
        const infoUser = await user.findOne({_id: item.userId});
        item.infoUser = infoUser
    }
    res.render("clients/pages/products/detail.pug",{
        productDetail: record,
        feedback: listFeedback
    })
}
