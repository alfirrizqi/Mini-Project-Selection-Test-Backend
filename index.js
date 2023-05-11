const express = require('express');
const port = 8000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

// const mysql2 = require('mysql2')


app.use(cors());

//to support cookies from the http request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());

//db
const db = require('./models');
db.sequelize.sync({alter: true});

// routes
const {authRoutes} = require('./routes')

// middleware
app.use('/auth', authRoutes)

app.listen(port, ()=> {
    console.log(`server is running at ${port}`)
})

