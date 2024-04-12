//require model here 
const products = require("../../models/product.model");
//[GET] /admin/products
module.exports.index = async (req,res) =>{
    const find = {
        deleted: false
    }
    //handle filter
    const ListBtnFilter  = [{
        name: "Tất cả",
        status: ""
    },{
        name: "Hoạt động",
        status: "active"
    },{
        name: "Không hoạt động",
        status: "inactive"
    }]
    if(req.query.status){
        const FindIndex = ListBtnFilter.findIndex(item => item.status === req.query.status);
        ListBtnFilter[FindIndex].class = "btn-warning"
    }else{
        ListBtnFilter[0].class = "btn-warning"
    }
    //end handle filter 

    if(req.query.status){
        find.status = req.query.status
    }
    //handle search product
    if(req.query.keyword){  
        const keyword = new RegExp(req.query.keyword);
        find.title = keyword
    }

    //handle pagaintion here
    const objectPagination = {
        pageCurrent: 1,
        limit: 5
    }
    if(req.query.page){
        objectPagination.pageCurrent = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.pageCurrent - 1) * objectPagination.limit;
    objectPagination.total = Math.ceil(await products.countDocuments(find) / objectPagination.limit);


    const record = await products.find(find).limit(objectPagination.limit).skip(objectPagination.skip);
    res.render("admin/pages/products/index.pug",{
        product: record,
        ListBtnFilter: ListBtnFilter,
        objectPagination: objectPagination
    });
}