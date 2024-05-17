//require model here 
const user = require("../../models/user.model");

module.exports.user = async (req,res,next) =>{
    if(req.cookies.tokenUser){
        const recordUser = await user.findOne({
            tokenUser: req.cookies.tokenUser
        });
        res.locals.user = recordUser
    }
    next();
    
}