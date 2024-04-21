//require model here
const news = require("../../models/news.model");
const account = require("../../models/account.model");
//[GET] /admin/news
module.exports.index = async (req,res) =>{
    const record = await news.find({deleted: false})
    for(const item of record){
        const createdBy = await account.findOne({
            _id: item.createdBy
        })
        item.createByFullName =createdBy?.fullName
    }
    res.render("admin/pages/news/index",{
        news: record
    });
}
//[GET] /admin/news/create
module.exports.create = (req,res) =>{
    res.render("admin/pages/news/create");
}
//[POST] /admin/news/create 
module.exports.createPost = async (req,res) =>{
    try {
        const record = new news(req.body);
        await record.save()
    } catch (error) {
        console.log(error);
    }
    res.redirect("/admin/news")
}
//[GET] /admin/news/edit/:id 
module.exports.edit = async (req,res) =>{
    const id = req.params.id;
   const record = await news.findById({
        _id: id
    })
    res.render("admin/pages/news/edit.pug",{
        news: record
    });
}
//[PATCH] /admin/news/edit/:id
module.exports.editPatch = async (req,res) =>{
    try {
        await news.updateOne({
            _id: req.params.id
        },req.body)
        req.flash('sucess','Chỉnh sửa thành công')
    } catch (error) {
        rea.flash('error','Chỉnh sửa thất bại')
    }
    res.redirect("/admin/news");
}
//[PATCH] /admin/news/sort-delete/:id
module.exports.sortDelete = async (req,res) =>{
    try {
        await news.updateOne({
            _id: req.params.id
        },{
            deleted: true
        })
        req.flash('sucess','Xóa thành công')
    } catch (error) {
        req.flash('error','Xóa thất bại')
        console.log(error);
    }
    res.redirect("back");
}
//[GET] /admin/news/detail/:id
module.exports.detail = async(req,res) =>{

    const id = req.params.id;
    try {
        const record =  await news.findById({
            _id: id
        })
        
        res.render("admin/pages/news/detail.pug",{
            news: record
        });
    } catch (error) {
        console.log(error);
        req.flash('Id không hợp lệ');
        res.redirect("admin/news")
    }
    
}