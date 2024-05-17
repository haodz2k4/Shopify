//require model here
const user = require("../../models/user.model");
const chat = require("../../models/chat.model");
//[GET] "/chat"
module.exports.index = async (req,res) =>{
    if(!res.locals.user){
        res.redirect("/user/login");
        return;
    }
    io.once('connection',(socket) =>{
        console.log("1 User connected");
        //send message
        socket.on('CLIENT_SEND_MESSAGE', async (data) =>{
            const newChat = new chat({
                userId: res.locals.user.id,
                content: data,

            })
            await newChat.save();
            io.emit("SERVER_RETURN_MESSAGE",{
                userId: res.locals.user.id,
                content: data,
                fullName: res.locals.user.fullName

            });
        })
        //send typing
        socket.on('CLIENTS_SEND_TYPING', (data) =>{
            socket.broadcast.emit('SERVER_RETURN_TYPING',{
                type: data,
                userId: res.locals.user.id,
                fullName: res.locals.user.fullName
            })
        })
    })
    const chatList = await chat.find({
        deleted: false
    })
    for(const item of chatList){
        const infoUser = await user.findOne({
            _id: item.userId
        })
        item.fullName = infoUser.fullName;
    }
    res.render("clients/pages/chat/index.pug",{
        chat: chatList
    })
}