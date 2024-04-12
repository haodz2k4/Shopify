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
    const record = await products.find(find);
    res.render("admin/pages/products/index.pug",{
        product: record,
        ListBtnFilter: ListBtnFilter
    });
}