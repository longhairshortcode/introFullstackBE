const mongoose = require("mongoose")


const studentRegisterSchema = new mongoose.Schema({
    studentID: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,    
    },
    userID: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "users",
    }

})


//how you export from node.js with common.js (it would look different with es6 module)
module.exports = mongoose.model("studentRegister", studentRegisterSchema)  