const Inventory = require("../../models/inventory.model");
const Product = require("../../models/product.model")
//[get] "/admin/inventories"
module.exports.index  = async (req, res) =>{

    const inventories = await Inventory.find({
        deleted: false
    })
    for(const item of inventories){
        item.product = await Product.findOne({
            _id: item.product_id
        })
    }
    res.render("admin/pages/inventory/index.pug",{
        inventories
    })
}
//[POST] "/admin/inventories/update"
module.exports.update = async (req, res) =>{

    const body = req.body;
    try {
        const list = body.ids.split(",");
        console.log(list)
        for(const item of list){
            const [id, quantity] = item.split("-");
            await Inventory.updateOne({
                _id: id
            },{quantity})
        }
        res.redirect("back");
    } catch (error) {
        res.redirect("back");
    }
}