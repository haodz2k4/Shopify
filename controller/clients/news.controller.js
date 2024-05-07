//require model here 
const news = require("../../models/news.model");
const account = require("../../models/account.model");
const user = require("../../models/user.model");
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
        for(const cmt of item.comment){
            const recordUser = await user.findOne({
                _id: cmt.userId
            })
            cmt.infoUser = recordUser
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
//[POST] "/news/comments/add/:newsId"
module.exports.commentPost = async (req,res) =>{
    const content = req.body.content;
    console.log(content)
    try {
        await news.updateOne({
            _id: req.params.newsId
        },{
            $push: 
            {comment: {userId: res.locals.user.id,content: content}}
        })
        req.flash('success','Thêm Bình luận thành công')
    } catch (error) {
        console.log(error);
        req.flash('error','Thêm Bình Luận Thất Bại')
    }
    res.redirect("back");
}