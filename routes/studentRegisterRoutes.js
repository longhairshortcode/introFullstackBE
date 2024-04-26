const express = require("express");
// because of below, can use all the http methods
const router = express.Router()
const studentRegisterController = require("../controllers/studentRegisterController.js") 

//router.http has two argument, first: string and 2nd: function that gets called

//http://localhost:2121/student-register/get-single-student/:id
router.get("/get-single-student/:id", studentRegisterController.getSingleStudent)
//http://localhost:2121/student-register/get-all-students
router.get("/get-all-students", studentRegisterController.getAllStudents)

//http://localhost:2121/student-register/create-single-student
router.post("/create-single-student", studentRegisterController.createSingleStudent)

//http://localhost:2121/student-register/update-single-student/:id
router.put("/update-single-student/:id", studentRegisterController.updateSingleStudent)

//http://localhost:2121/student-register/delete-single-student/:id
router.delete("/delete-single-student/:id", studentRegisterController.deleteSingleStudent)


const studentRegisterRoutes = router
module.exports = studentRegisterRoutes
