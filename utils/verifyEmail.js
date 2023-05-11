const nodemailer = require('nodemailer');

//send a verification email to the new user
function sendLinkVerificationEmail(email, verificationLik) {

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
        if(err) {
            console.err('Error sending email:', err);
        } else {
            console.log('Email sent:', info.res);
        }
    });
}

module.exports = {sendLinkVerificationEmail};