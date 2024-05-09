const nodemailer = require('nodemailer');
module.exports.sendEmail = (email,subject,content) =>{
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deptroaihao253@gmail.com',
        pass: 'bptt umlq hxbi otyc'
    }
    });

    const mailOptions = {
    from: 'deptroaihao253@gmail.com',
    to: email,
    subject: subject,
    text: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { success: false, message: "Email không tồn tại." };
        } else {
            console.log('Email sent: ' + info.response);
            return { success: true, message: "Email đã được gửi thành công." };
        }
    });
}
