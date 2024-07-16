//require model here
const Products = require("../../models/product.model");
const productCategory = require("../../models/product-category.model");
const account = require("../../models/account.model");
const user = require("../../models/user.model");
const news = require("../../models/news.model");
const order = require("../../models/order.model");
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
//require helper here
const {getStartAndEndOfDay} = require("../../helpers/getDate.helper.js");
const {formatCurrency} = require("../../helpers/formatCurrency.helper.js");
//[GET] /admin/dashboard
module.exports.index = async (req,res) =>{
    
    const statistis = {
        productCategory: {
            total: await productCategory.countDocuments({deleted: false}),
            active: await productCategory.countDocuments({status: "active",deleted: false}),
            inactive: await productCategory.countDocuments({status: "inactive",deleted: false})
        },
        products: {
            total: await Products.countDocuments({deleted: false}),
            active: await Products.countDocuments({status: "active",deleted: false}),
            inactive: await Products.countDocuments({status: "inactive",deleted: false})
        },
        account: {
            total: await account.countDocuments({deleted: false}),
            active: await account.countDocuments({status: "active",deleted: false}),
            inactive: await account.countDocuments({status: "inactive",deleted: false})
        },
        user: {
            total: await user.countDocuments({deleted: false,deleted: false}),
            active: await user.countDocuments({status: "active",deleted: false}),
            inactive: await user.countDocuments({status: "inactive",deleted: false})
        },
        news: {
            total: await news.countDocuments({deleted: false,deleted: false}),
            active: await news.countDocuments({status: "active",deleted: false}),
            inactive: await news.countDocuments({status: "inactive",deleted: false})
        }

    }

    const typeStatistics = req.query.statistics;
    const objectStatistics = {
        countOfBooks: 0,
        Revenue: 0,
        orders: []
    };
    const {startOfDay,endOfDay} = getStartAndEndOfDay();
    if(typeStatistics){
        switch(typeStatistics){
            case 'day': 
                const orders = await order.find({
                    createdAt: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    }
                });
                let count = 0;
                let Revenue = 0;
                for(const item of orders){
                    for(const elm of item.products){
                        Revenue += ((elm.price) * (100 - elm.discountPercentage)/100) * elm.quantity;
                        
                        count += elm.quantity;
                    }
                    
                }
                
                objectStatistics.countOfBooks  = count;
                objectStatistics.Revenue = formatCurrency(Revenue); 
                objectStatistics.orders = orders
                break; 

            

        }
    }
    res.render("admin/pages/dashboard/index.pug",{
        statistis: statistis,
        infoStatistisByDate: objectStatistics,
        daySelected: typeStatistics

    });
}
//[POST] "/dashboard/export-report"
module.exports.exportReport = async (req, res) => {
    try {
        // Parse JSON từ body của yêu cầu
        const value = JSON.parse(req.body.orders);
        
        // Tạo một workbook mới
        const workbook = xlsx.utils.book_new();

        // Chuyển đổi dữ liệu đơn hàng thành định dạng sheet
        const worksheetData = value.orders.map(order => ({
            'Order ID': order._id,
            'Customer Name': order.userInfo.fullName,
            'Phone': order.userInfo.phone,
            'Address': `${order.userInfo.address.street}, ${order.userInfo.address.city}, ${order.userInfo.address.country}`,
            'Products': order.products.map(p => `ID: ${p.productId}, Qty: ${p.quantity}, Price: ${formatCurrency(p.price)}, Discount: ${p.discountPercentage}%`).join('\n'),
            'Total Books': order.products.reduce((sum, p) => sum + p.quantity, 0),
            'Revenue': formatCurrency(order.products.reduce((sum, p) => sum + p.price * p.quantity * (1 - p.discountPercentage / 100), 0)),
            'Created At': new Date(order.createdAt).toLocaleString()
        }));

        // Thêm dữ liệu tổng hợp
        worksheetData.push(
            {
                'Order ID': '',
                'Customer Name': 'Total',
                'Phone': '',
                'Address': '',
                'Products': '',
                'Total Books': value.countOfBooks,
                'Revenue': value.Revenue,
                'Created At': ''
            }
        );

        // Chuyển đổi dữ liệu thành worksheet
        const worksheet = xlsx.utils.json_to_sheet(worksheetData);

        // Thêm worksheet vào workbook
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders');

        // Đường dẫn lưu file Excel
        const filePath = path.join(__dirname, '../../public/reports', 'Orders.xlsx');

        // Ghi file
        xlsx.writeFile(workbook, filePath);

        console.log(`File được xuất thành công: ${filePath}`);
        
        // Gửi file về phía client
        res.download(filePath, 'Orders.xlsx', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending file');
            } else {
                // Xóa file sau khi gửi
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error exporting report:', error);
        res.status(500).send('Error exporting report');
    }
};