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
//mce 
const path = require('path');
/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

//Router
const adminRouter = require("./router/admin/index.router");
adminRouter(app);
const clientRouter = require("./router/clients/index.router");
clientRouter(app);
//app local variable 
const moment = require("moment");
app.locals.moment =moment;
//handle socket here 
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global.io = io;
server.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
})

