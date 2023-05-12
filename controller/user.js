const db = require("../models");
const User = db.user;
const { sendLinkVerificationEmail } = require('../utils/verifyEmail')
const emailValidator = require('email-validator');

// const bcrypt = require("bcryptjs");


//user registration
const userAuthController = {
    register: async (req, res) => {
        const { name, username, email, password } = req.body;

        try {

            //check email
            const existingEmail = await User.findOne({
                where: { email }
            });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email is already registered' });
            }


            // Check username
            const existingUsername = await User.findOne({
                where:
                    { username }
            });
            if (existingUsername) {
                return res.status(400).json({ error: 'Username is already taken' });
            }

            //validate email format
            if (!emailValidator.validate(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            //check password strength
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    error: 'Password must contain at least 8 characters, including an uppercase letter, a symbol, and a number',
                });
            }

            //check pasword matching
            // if (password !== repeatPassword) {
            //     return res.status(400).json({ error: 'Passwords do not match' });
            // }


            // new user without verification status
            const newUser = new User({
                name,
                username,
                email,
                password,
                Verified: false,
            });

            //hash password
            // const salt = await bcrypt.genSalt(10);
            // const hashPassword = await bcrypt.hash(password, salt);
            await newUser.save();

            //sending verification email
            sendLinkVerificationEmail(email, newUser.id)

            res.status(200).json({ message: 'Registration succesful. Please check your email for verification.' })


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Login: async (req, res) => {
        const { username, email, password } = req.body;

        try {

            //check email
            const existingEmail = await User.findOne({
                where: { email }
            });
            if (existingEmail) {
                return res.status(200).json({ res: 'This account is provided' });
            }


            // Check username
            const existingUsername = await User.findOne({
                where:
                    { username }
            });
            if (existingUsername) {
                return res.status(400).json({ res: 'Username is provided' });
            }

            /// Verify the password
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    error: 'Password must contain at least 8 characters, including an uppercase letter, a symbol, and a number',
                });
            }
                

                //check pasword matching
                // if (password !== repeatPassword) {
                //     return res.status(400).json({ error: 'Passwords do not match' });
                // }

                // Create and sign a JWT token
                const token = jwt.sign({ userId: user.id }, 'your_secret_key');

                // Redirect to the home page with the token
                res.redirect(`/home?token=${token}`);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}





module.exports = userAuthController;