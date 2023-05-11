const db = require("../models");
const User = db.user;
const { sendLinkVerificationEmail } = require('../utils/verifyEmail')




//user registration
const registerUserAuth = {
    register: async (req, res) => {
        const { name, username, email, password, repeatPassword } = req.body;

        try {
            //name
            const checkName = await User.findOne({
                where: {
                    name
                }
            });

            //check email
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email is already registered' });
            }

            // Check username
            const existingUsername = await User.findOne({ username });
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
            if (password !== repeatPassword) {
                return res.status(400).json({ error: 'Passwords do not match' });
            }

            // new user without verification status
            const newUser = new User({
                name, 
                username, 
                email, 
                password, 
                repeatPassword,
                Verified: false,
            }); 
            await newUser.save();

            //sending verification email
            sendLinkVerificationEmail(email, newUser.id)
            
            res.status(200).json({message: 'Registration succesful. Please check your email for verification.'})
            

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
        } 
}

module.exports = registerUserAuth;