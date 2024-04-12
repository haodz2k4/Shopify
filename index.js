const express = require("express");
const app = express();
//require dotenv 
require('dotenv').config();
const port = process.env.PORT;
//View engine here
app.set('view engine','pug');
app.set('views', './views');
//static file here
app.use(express.static('public'));

//Require database here 
const database = require("./config/database");
database();

//Router
const adminRouter = require("./router/admin/index.router");
adminRouter(app);
const clientRouter = require("./router/clients/index.router");
clientRouter(app);


app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
})

