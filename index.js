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
//body-parser
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//require method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//Require database here 
const database = require("./config/database");
database();
//require express flash here
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Router
const adminRouter = require("./router/admin/index.router");
adminRouter(app);
const clientRouter = require("./router/clients/index.router");
clientRouter(app);


app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
})

