const nodemailer = require('nodemailer');

//send a verification email to the new user
function sendLinkVerificationEmail(email, verificationToken) {




    // create a transporter to email service provider
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'alfirrizqiivan68@gmail.com',
            pass: 'mziojmodrqcltdix'
        },
    });


    //compose email message
    const emailCompose = {
        from: 'alfirrizqiivan68@gmail.com',
        to: email,
        subject: 'Account Verification',
        text: `Please click the following link to verify your account: http://localhost:8000/verify/${verificationToken}`,
    };

    //send the email
    transporter.sendMail(emailCompose, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendLinkVerificationEmail };