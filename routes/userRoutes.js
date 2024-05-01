const express = require("express");
const router = express.Router()
const userController = require("../controllers/userController.js")



//DO NOT NEEED :id but yes additional argument
//http://localhost:2323/user/sign-up
router.post("/sign-up", userController.signUp)

//DO NOT NEEED :id but yes additional argument
//http://localhost:2323/user/login
router.post("/login", userController.login)


const userRoutes = router
module.exports = userRoutes