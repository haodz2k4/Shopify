//require model here 
const products = require("../../models/product.model");
const productCategory = require("../../models/product-category.model");
//require helper here
const createTree = require("../../helpers/createTree.helper");
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
    //count garbage here 
    const countGarbage = await products.countDocuments({deleted: true});

    //handle sorting 
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    const sort = {};
    if(sortKey && sortValue){
        sort[sortKey] = sortValue;
    }else{
        sort.position = 'desc'
    }

    const record = await products.find(find).limit(objectPagination.limit).skip(objectPagination.skip).sort(sort);
    res.render("admin/pages/products/index.pug",{
        product: record,
        ListBtnFilter: ListBtnFilter,
        objectPagination: objectPagination,
        countGarbage: countGarbage
    });
}
//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) =>{
    const type = req.body.typeMulti;
    const id = req.body.id;
    const idList = id.split("; ");
    try {
        switch(type){
            case 'active-multi':
                 await products.updateMany({
                    _id: {$in: idList}
                 },{
                    status: 'active'
                 })
                 req.flash('sucess','Thay đổi trạng thái thành công')
                 break;
            case 'inactive-multi':
                await products.updateMany({
                    _id: {$in: idList}
                },{
                    status: 'inactive'
                })
                
                req.flash('sucess','Thay đổi trạng thái thành công')
                break;
            case 'change-position-multi':
                for(const item of idList){
                    const [ids,position] = item.split("-");
                    console.log(item.split("-"));
                    await products.updateOne({
                        _id: ids
                    },{
                        position: parseInt(position)
                    })
                }
                
                req.flash('sucess','Thay đổi vị trí sản phẩm thành công')
                break;
            case 'delete-multi':
                await products.updateMany({
                    _id: {$in: idList}
                },{
                    deleted: true
                })
                req.flash('sucess','Đã chuyển vào thùng rác')   
                break;
            default: break;
                
    
        }
        res.redirect("back");
    } catch (error) {
        req.flash('error','Không thể thay đổi sản phẩm')
        console.log(error);
        res.redirect("back");
    }
}
//[PATCH] /admin/products/change-status
module.exports.changeStatus = async (req,res) =>{   
    const status = req.params.status;
    const id = req.params.id;
    const changeStatus = (status == 'active')  ? 'inactive' : 'active';
    await products.updateOne({
        _id: id
    },{
        status: changeStatus
    })
    req.flash('sucess', 'Thay đổi trạng thái sản phẩm thành công');
    res.redirect("back");
}
//[PATCH] /admin/products/soft-delete/:id
module.exports.softDelete = async (req,res) =>{
    try {
        await products.updateOne({
            _id: req.params.id
        }, {
            deleted: true
        })
        req.flash('sucess','Thêm vào thùng rác thành công')
    } catch (error) {
        console.log(error);
        req.flash('error','Thêm vào thùng rác thất bại')
    }   
    res.redirect("back");
}

//[GET] /admin/products/garbage/
module.exports.garbage = async (req,res) =>{

    const record = await products.find({deleted: true})
    res.render("admin/pages/products/garbage.pug",{
        product: record
    });
}
//[DELETE] /admin/products/garbage/delete-forever/:id
module.exports.deleteForever = async (req,res) =>{

    try {
        await products.deleteOne({
            _id: req.params.id
        })
        req.flash('sucess','Xóa sản phẩm thành công');
    } catch (error) {
        console.log(error);
        req.flash('error','Xóa sản phẩm thất bại')
    }
    res.redirect("back");
}
//[GET] /admin/products/create
module.exports.create = async (req,res) =>{

    const record = await productCategory.find({});
    const newRecord = createTree(record);
    res.render("admin/pages/products/create",{
        productCategory: newRecord
    });  
}
//[POST] /admin/products/create
module.exports.createPost = async (req,res) =>{
    if(!res.locals.localRoles.permissions.includes("product_create")){
        res.send("Không có quyền truy cập");
        return;
    }
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        req.body.position = await products.countDocuments();
    }   
    const record = new products(req.body);
    await record.save();
    req.flash('sucess','Thêm mới sản phẩm thành công')
    res.redirect("/admin/products");
}
//[GET] /admin/products/edit/:id
module.exports.edit = async (req,res) =>{

    const record = await products.findById({
        _id: req.params.id
    })
    const categoryRecord = await productCategory.find({});
    const newCategoryRecord = createTree(categoryRecord);
    res.render("admin/pages/products/edit.pug",{
        product: record,
        categoryRecord: newCategoryRecord
    });
}
//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res) =>{
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);
    }else{
        req.body.position = await products.countDocuments();
    }   
    try {
        await products.updateOne({
            _id: req.params.id
        },req.body)
        req.flash('sucess','Cập nhật sản phẩm thành công')
    } catch (error) {
        console.log(error);
        req.flash('error','Cập nhật sản phẩm thất bại');
    }
   res.redirect("/admin/products")
}
//[GET] /admin/products/detail
module.exports.detail = async (req,res) =>{
    const id = req.params.id;
   try {
        const record = await products.findById({
            _id: id
        })
        res.render("admin/pages/products/detail.pug",{
            product: record
        })
   } catch (error) {
        console.log(error);
        
        req.flash('error','Không thể xem chi tiết sản phẩm');
        res.redirect("back");
   }
}
//[PATCH] /admin/products/garbage/restore/:id
module.exports.restore = async (req,res) =>{
    
    try {
        await products.updateOne({
            _id: req.params.id
        },{
            deleted: false
        })
        req.flash('sucess','Khôi phục sản phẩm thành công');
        res.redirect("back");
    } catch (error) {
        console.log(error);
        req.flash('error','Khôi phục sản phẩm thất bại');
        req.redirect("back");
    }
}
