let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mynodejsemailservice@gmail.com',
        pass: 'CellarDOOR'
    }
});

let mailOptions = {
    from: 'mynodejsemailservice@gmail.com',
    to: 'the.loginov@gmail.com',
    subject: 'Message from node flihts track app',
    text: ''
};


module.exports = function sendEmail(texToSend) {

    mailOptions.text = texToSend;

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


