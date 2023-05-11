// const express = require('express');
const {registerUserAuth} = require('../controller/userAuth');

const router = require('express').Router;;






//router untuk register
router.post("/register", registerUserAuth.register)







module.exports = router;