const db = require("../models");
const User = db.user;
const { sendLinkVerificationEmail } = require('../utils/verifyEmail')
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");


//user registration
const userAuthController = {
    Register: async (req, res) => {
        const { name, username, email, password } = req.body;

        try {

            //check email
            const existingEmail = await User.findOne({
                where: { email }
            });
            if (existingEmail) {
                return res.status(400).json({ error: 'Email is already registered' });
            }
            //validate email format
            if (!emailValidator.validate(email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }


            // Check username
            const existingUsername = await User.findOne({
                where:
                    { username }
            });
            if (existingUsername) {
                return res.status(400).json({ error: 'Username is already taken' });
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


            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            // create a new user
            const newUser = new User({
                name,
                username,
                email,
                password: hashPassword,
                Verified: false,
            });

            //save to database
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
        const {  email, password } = req.body;

        try {

            //check email
            const existingEmail = await User.findOne({
                where:
                    { email }
            });
            if (!existingEmail) {
                return res.status(404).json({ res: 'This account is not available' });
            }
            
             // Compare the provided password with the hashed password
             const match = await bcrypt.compare(password, existingEmail.password);
         
            //check pasword matching
             if (!match) {
                 return res.status(400).json({ error: 'Passwords do not match' });
             }
            

            // Create and sign a JWT token
            // const token = jwt.sign({ userId: User.id }, 'your_secret_key');

            const token = jwt.sign(
                { user_id: existingEmail.id, email },
                'authentication',
                {
                  expiresIn: "",
                }
              );

             
        
              // save user token
            //   User.token = token;


            // await existingEmail.update({
            //     token
            // });

            // Redirect to the home page with the token
            res.status(200).json({message: 'login succes', token })

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    Logout: async (req, res) => {

        try {
           








        } catch (error) {

        }

    },
    Update: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }

}





module.exports = userAuthController;