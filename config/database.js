const mongoose = require("mongoose");

module.exports = () =>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("connect to database sucessfull")
    } catch (error) {
        console.log("connect to database fail");
        console.log(error)
    }
}

