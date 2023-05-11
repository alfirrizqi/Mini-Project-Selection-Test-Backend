// const express = require('express');
const userAuth = require('../controller/user');


const router = require('express').Router();






//router untuk register
router.post("/register", userAuth.register)







module.exports = router;