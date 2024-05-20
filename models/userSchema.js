const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentRegister",
    }

})

module.exports = mongoose.model("Users", userSchema)

// var twoDArray = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ];
// User
// function arrAdder(arr) {
//   var sentence = "";
//   for(var i = 0; i < arr[0].length; i++){
//     for(var j = 0; j < arr.length; j++){
//       sentence+=arr[j][i];
//     }
//     sentence+=" ";
//   }
//   return sentence.trim();
// }