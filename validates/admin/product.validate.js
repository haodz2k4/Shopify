module.exports.createPost = (req,res,next) =>{
    console.log(req.body.title);
    if(req.body.title.length < 5){
        req.flash('error','Tiêu đề không được quá 5 ký tự')
        res.redirect("back");
        return;
    }else if (!req.body.title){
        req.flash('error','Tiêu đề không được bỏ trống')
        res.redirect("back");
        return;
    }
}