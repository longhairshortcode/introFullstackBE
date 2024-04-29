const express = require("express");
const router = express.Router()
const userController = require("../controllers/userController.js")




//http://localhost:2121/user/sign-up
router.post("/sign-up", userController.signUp)

//http://localhost:2121/user/login
router.post("/login", userController.login)


const userRoutes = router
module.exports = userRoutes