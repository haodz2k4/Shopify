//require model here
const productCategory = require("../../models/product-category.model");
//require helper here
const createTree = require("../../helpers/createTree.helper");
module.exports.category = async (req,res, next) =>{
    
    const record = await productCategory.find({
        deleted: false,
        status: "active"
    })
    const newRecord = createTree(record);
    res.locals.layoutProductCategory = newRecord;
    next()
}