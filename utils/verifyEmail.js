const nodemailer = require('nodemailer');

//send a verification email to the new user
function sendLinkVerificationEmail(email, verificationToken) {




    // create a transporter to email service provider
    const emailService = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        },
    });


    //compose email message
    const emailCompose = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Account Verification',
        text: 'Please click the following link to verify your account: ${verificationLink}'
    };

    //send the email
    emailService.sendMail(emailCompose, (error, info) => {
        if (error) {
            console.err('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = { sendLinkVerificationEmail };