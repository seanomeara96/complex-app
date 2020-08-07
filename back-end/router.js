const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')
const followController = require('./controllers/followController')



//user related routes
router.get('/', userController.home)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/doesUsernameExist', userController.doesUsernameExist)
router.post('/doesEmailExist', userController.doesEmailExist)
//this (line10) handles a post request to /login
//and runs a middleware function from userController.js called login
//middleware are the functions methods and operations carrieed out between server requests and responses
router.post('/logout', userController.logout)
//post related routs
router.get('/create-post', userController.mustBeLoggedIn, postController.viewCreateScreen)
router.post('/create-post', userController.mustBeLoggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)
//:id being included makes the slug flexible
router.get('/post/:id/edit', userController.mustBeLoggedIn, postController.viewEditScreen)
router.post('/post/:id/edit', userController.mustBeLoggedIn, postController.edit)
router.post('/post/:id/delete', userController.mustBeLoggedIn, postController.delete)
router.post('/search',postController.search)

//profile related route
router.get('/profile/:username', userController.ifUserExists,userController.sharedProfileData, userController.profilePostsScreen)
router.get('/profile/:username/followers', userController.ifUserExists, userController.sharedProfileData, userController.profileFollowersScreen)
router.get('/profile/:username/following', userController.ifUserExists, userController.sharedProfileData, userController.profileFollowingScreen)


//follow related routes
router.post('/addFollow/:username', userController.mustBeLoggedIn,followController.addFollow)
router.post('/removeFollow/:username', userController.mustBeLoggedIn,followController.removeFollow)



module.exports = router