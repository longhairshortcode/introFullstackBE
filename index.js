//1) DEPENDENCIES - import and require: express, cors, mongoose(import mongodb too), dotenv
const express = require("express");
// cors (cross origin(FE) resource sharing) - used to allow data to be 
//shared between two endpoints, cors tells what kind of FE can access the server 
//cors is like gatekeeper that states which FE, https/ (badge), can pass through
//if wrong https tries to get through, will send error
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config();
const studentRegisterRoutes = require("./routes/studentRegisterRoutes.js")
const studentRegisterSchema = require("./models/studentRegister.js")
const userRoutes = require("./routes/userRoutes.js");
const userSchema = require("./models/userSchema.js");

//2) Initialize Express
const app = express()

//3) Middleware - (intercepts and process all the requests and responses between FE and BE, acts as the middleman to make sure the info
//flows in and out correctly) CORS AND JSON 
//can reuse const allowedOrigins all the way to the end of app.use((cors...)) for any project.
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"] 
app.use(cors(
    {
        origin: (origin, callback) => {
            if( !origin || allowedOrigins.includes(origin)){
               callback(null, true)     
            }else {
                callback(new Error(
                    "origin not allowed by cors policy"
                ))  
            }
        }, 
        methods:["POST", "GET", "PUT", "DELETE", "PATCH", "HEAD"],
        credentials: true, 
    }
))

// json middleware
app.use(express.json())
//routes middleware
app.use("/student-register", studentRegisterRoutes)
app.use("/user", userRoutes)

//4) Connect DB & LISTEN TO PORT(Server Configuration) (create db project, put mongo string in .env, 1)const port, 2) connectDB function 3) call connectDB)
const PORT = process.env.PORT || 2323



const MONGODB_STRING = process.env.MONGODB_STRING // grab string from env
const connectDB = async () => { //start asynchronous function 
    try{
        await mongoose.connect(MONGODB_STRING) // await connecting by the .connect method and the env item in ()
        app.listen(PORT, () => { //estalish port listening to
            console.log(`Connected to MongoDB and server is running on: ${PORT} `)
        })
    }catch(Error){ // if error connecting, console it and do process... to stop code from allowing server to run inconsistently 
        console.log(Error)
        process.exit(1)
    }
      
}

connectDB();