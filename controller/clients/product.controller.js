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
