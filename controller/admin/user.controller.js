//require model here
const user = require("../../models/user.model");
//[GET] "/admin/user"
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
        find.status = req.query.status;
        const FindIndex = ListBtnFilter.findIndex(item => item.status === req.query.status);
        ListBtnFilter[FindIndex].class = "btn-warning"
    }else{
        ListBtnFilter[0].class = "btn-warning"
    }
    //end handle filter 
    const record = await user.find(find)
    res.render("admin/pages/users/index.pug",{
        user: record,
        ListBtnFilter: ListBtnFilter
    })
}
//[GET] "/admin/user/change-status/:status/:id"
module.exports.changeStatus = async (req,res) =>{

    const status = req.params.status;
    const id = req.params.id;
    switch(status){
        case "active":
            try {
                await user.updateOne({
                    _id: id
                },{
                    status: "inactive"
                })
                
                req.flash('success','Cập nhật trạng thái sản phẩm thành công');
            } catch (error) {
                
                req.flash('error','Cập nhật trạng thái sản phẩm không thành công');
                console.log(error)
                
            }
            break
        case "inactive":
            try {
                await user.updateOne({
                    _id: id
                },{
                    status: "active"
                })
                req.flash('success','Cập nhật trạng thái sản phẩm thành công');
            } catch (error) {
                req.flash('error','Cập nhật trạng thái sản phẩm không thành công');
                console.log(error)
            }
            break;
        default:
            break;
    }
    res.redirect("back");
}