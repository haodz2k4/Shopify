//[GET] "/products"
const product = require("../../models/product.model");
module.exports.index = async (req,res) =>{
    

    //handle pagination 
    const objectpagination = {
        currentPage: 1,
        limit: 9
    }
    if(req.query.page){
        objectpagination.currentPage = parseInt(req.query.page);
    }
    objectpagination.skip = (objectpagination.limit - 1) * objectpagination.currentPage;
    objectpagination.total = Math.ceil(await product.countDocuments({deleted: false}) / objectpagination.limit);

    const record = await product.find({deleted: false}).limit(objectpagination.limit).skip(objectpagination.skip).sort({position: 'desc'});
    res.render("clients/pages/products/index.pug",{
        product: record,
        pagination: objectpagination
    });
}
