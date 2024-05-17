const nodemailer = require('nodemailer');
module.exports.sendEmail = (email, subject, content) => {
    return new Promise((resolve, reject) => {
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
                reject({ success: false, message: "Email Không tồn tại" });
            } else {
                console.log('Email sent: ' + info.response);
                resolve({ success: true, message: "Email đã được gửi thành công" });
            }
        });
    });
};

