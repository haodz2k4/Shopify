const Inventory = require("../../models/inventory.model");
const Product = require("../../models/product.model")
const mongoose = require("mongoose");
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
module.exports.index = async (req, res) => {
    try {
        const inventories = await Inventory.find({ deleted: false });
        for (const item of inventories) {
            if (isValidObjectId(item.product_id)) {
                const product = await Product.findOne({ _id: item.product_id });
                if (product) {
                    item.abc = product;
                } else {
                    item.abc = {}; // Hoặc một giá trị mặc định khác nếu sản phẩm không tồn tại
                }
            } else {
                item.abc = {}; // Hoặc một giá trị mặc định khác nếu _id không hợp lệ
            }
        }
        console.log(inventories);
        res.render("admin/pages/inventory/index.pug", { inventories });
    } catch (error) {
        console.error("Error fetching inventories:", error);
        res.status(500).send("Internal Server Error");
    }
};

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