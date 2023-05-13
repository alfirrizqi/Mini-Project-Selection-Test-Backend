// const express = require('express');
const userController = require('../controller/user');
const postController = require('../controller/posts')
const likeController = require('../controller/likes')
const commentsController = require('../controller/comments')


const router = require('express').Router();






//router untuk register user
router.post("/register", userController.Register)
// router untuk login user
router.post('/Login', userController.Login)
//router untuk logout user
router.post('/logout', userController.Logout)

//router untuk post
router.post('/post',)

//router untuk like
router.get('/likes',)

//router untuk comments
router.post('/comments',)






module.exports = router;