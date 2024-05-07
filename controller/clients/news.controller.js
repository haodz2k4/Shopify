//require model here 
const news = require("../../models/news.model");
const account = require("../../models/account.model");
//[GET] "/news"
module.exports.index = async (req,res) =>{
    const recordNews = await news.find({status: "active",deleted: false}).sort({position: "desc"});
    for(const item of recordNews){
        const infoAdmin = await account.findOne({
            _id: item.createdBy 
        })
        item.infoAdmin = infoAdmin
        if(res.locals.user){
            item.isLiked = item.liked.some(item => item.userId === res.locals.user.id);
        }
       
        
    }
    res.render("clients/pages/news/index.pug",{
        news: recordNews
    });
}
//[GET] "/news/like/add/like"
module.exports.addLike = async (req,res) =>{
    await news.updateOne({
        _id: req.params.id
    },{
        $push: {liked: {userId: res.locals.user.id}}
    })
    res.redirect("back");
}
//[GET] "/news/like/remove/false"
module.exports.removeLike = async (req,res) =>{
    await news.updateOne({
        _id: req.params.id
    },{
        $pull: {liked: {userId: res.locals.user.id}}
    })
    res.redirect("back");
}