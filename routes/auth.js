// const express = require('express');
const userController = require('../controller/user');
const postController = require('../controller/posts')
const likeController = require('../controller/likes')
const commentsController = require('../controller/comments')
const {upload} = require('../src/uploader/uploader.js')
const verifyToken  = require('../middleware/auth')
const router = require('express').Router();



//middleware



//router untuk register user
router.post("/register", userController.Register)
// router untuk login user
router.post('/Login', userController.Login)
//router untuk logout user
router.post('/logout', userController.Logout)

//router untuk cretae post
router.post('/post/create/', verifyToken, upload({
    acceptedFileTypes: ["png", "jpg", "jpeg"],
    filePrefix: "FILE",
    maxSize: 1 * 1024 * 1024,
}).single("media"), postController.Create)
//router untuk get posts
router.get('/post/get', verifyToken, postController.get)

//router untuk update post
router.put("/post/update/:id", verifyToken, postController.update)
//route untuk delete post per userid
router.delete("/post/delete/:id", postController.deleteById)
//router untuk get a post by user id
router.get('/post/get/:id', postController.getById)






//router untuk like
router.get('/likes',)

//router untuk comments
router.post('/comments',)






module.exports = router;