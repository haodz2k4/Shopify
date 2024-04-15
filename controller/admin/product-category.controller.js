//Require database here
const productCategory = require("../../models/product-category.model");
//[GET] /admin/product-category 
module.exports.index = async (req,res) =>{

    const record = await productCategory.find({});
    
    res.render("admin/pages/product-category/index.pug",{
        productCategory: record
    });
}

//[GET] /admin/product-category/create
module.exports.create = async (req,res) =>{
    //handle create tree parent category here
    const createTree = (arr,parentId="") =>{
        const tree = [];
        for(const item of arr){
            if(item.parent_category === parentId){
                const newItem = item;
                const children = createTree(arr,item.id);
                if(children.length > 0){
                    newItem.children =children
                }
                tree.push(newItem);
            }
        }
        return tree;
    }
    const record = await productCategory.find({});
    const newRecord = createTree(record);
    res.render("admin/pages/product-category/create.pug",{
        listParent: newRecord
    })
}
//[POST] /admin/product-category/create
module.exports.createPost = async (req,res) =>{

    const record = new productCategory(req.body);
    try {
        await record.save();
        req.flash('sucess','Them mới danh mục thành công')
    } catch (error) {
        req.flash('error','Thêm mới danh mục thất bại');
        console.log(error);
    }


    res.redirect("/admin/product-category");
}
