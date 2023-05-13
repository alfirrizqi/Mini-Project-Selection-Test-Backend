const express = require('express');
const port = 8000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');



//to support cookies from the http request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/public', express.static('public'))


//db
 const db = require('./models');
 db.sequelize.sync({alter: true});

// routes
const {authRoutes} = require('./routes')

// middleware
app.use(express.json())
app.use(cors());
app.use(cookieParser());


//untuk memanggil routes
app.use('/auth', authRoutes)
// app.use('/auth/posts', postRoutes)
// app.use('/auth/comments', commentRoutes)
// app.use('/auth/likes', likeRoutes)



app.listen(port, ()=> {
    console.log(`server is running at ${port}`)
})

