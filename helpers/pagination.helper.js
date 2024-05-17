const products = require("../models/product.model");
module.exports.objPagination = async (req) =>{
    const objectPagination = {
        currentPages: 1,
        limitPages: 16
    }
    
    if(req.query.pages){
        objectPagination.currentPages = parseInt(req.query.pages);
    }else{
        
    }
    objectPagination.skipPages = (objectPagination.currentPages - 1) * objectPagination.limitPages;
    
    
    return objectPagination;
}