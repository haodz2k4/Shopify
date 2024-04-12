const mongoose = require("mongoose");

module.exports = () =>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/shopify-management');
        console.log("connect to database complete")
    } catch (error) {
        console.log("connect to database fail");
        console.log(error)
    }
}

