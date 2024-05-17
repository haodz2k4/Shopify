//require model here 
const news = require("../../models/news.model");
const account = require("../../models/account.model");
const user = require("../../models/user.model");
//[GET] "/news"
module.exports.index = async (req,res) =>{
    const recordNews = await news.find({deleted: false, status: "active"});
    
    res.render("clients/pages/news/index.pug",{
        news: recordNews
    });
}
//[GET] "/news/detail/:slug"
module.exports.detail = async (req,res) =>{
    const record = await news.findOne({
        slug: req.params.slug
    })
    res.render("clients/pages/news/detail.pug",{
        news: record
    });
}
