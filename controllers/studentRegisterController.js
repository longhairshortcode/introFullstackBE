const studentRegisterSchema = require("../models/studentRegister.js")
// exports object that contains controller functions
//each prop in this obj contains functions as it's value, therefore calling the prop
// automatically fires the function 
module.exports = {
    //each controller function must have req and res as the arguments, in exact order of req
    //first and res second.
    //req is request coming from the FE, res is response being sent back from the Server to FE
    getSingleStudent: (req, res) => {
        const {id} = req.params
        const studentId = req.params.id
        console.log(id)
    },

    getAllStudents: async (req, res) => {
        try {
            const allStudents = await studentRegisterSchema.find();
            if (!allStudents) {
                return res.status(404).json({
                    message: "No students found"
                });
            }
            return res.status(200).json(allStudents);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    createSingleStudent: async (req, res) => {
        try{
            const {studentID, name, email} = req.body 
              const existingStudent = await studentRegisterSchema.findOne({
                email: email
              })
              if (existingStudent){
                return res.json({
                    message: "This student already exists"
                })
              }  
              if ( studentID && name && email ) {
                const newStudent = await studentRegisterSchema.create({
                    studentID: studentID,
                    name: name,
                    email: email,
                })
                if (newStudent) {
                    res.status(200).json(newStudent)
                }
            }
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
        // const studentName = req.body.name
        // const studentEmail = req.body.email
    },
    
    updateSingleStudent: async (req, res) => {
        try {
            // extract req.params.id and the other items from the body
            const id = req.params.id;
            const { studentID, name, email } = req.body;
            
            if (!studentID && !name && !email){
                return res.status(404).json({
                    message: "No resource from client"
                });
            }
            // Check if the student exists by calling api and method and studentID, then putting it 
            //in an if statement
            const existingStudent = await studentRegisterSchema.findById({ _id : id });
    
            if (!existingStudent) {
                return res.status(404).json({
                    message: "This student doesn't exist"
                });
            }
    
    
            // Update the student
            const updatedStudent = await studentRegisterSchema.findByIdAndUpdate(
                { _id : id },
                {
                  studentID : studentID,
                  name : name,
                  email: email,  
                },
                { new: true } // Return the updated document
            );
    
            if (updatedStudent) {
                return res.status(200).json(updatedStudent);
            } else {
                return res.status(500).json({
                    message: "Failed to update student"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error); 
            console.log("The updateSingleStudent API function ran")
        }
    },

    deleteSingleStudent: async (req, res) => {
        try{
            const id = req.params.id 
              const existingStudent = await studentRegisterSchema.findById({ _id: id });
              if (!existingStudent){
                return res.status(404).json({
                    message: "This student doesn't exists"
                })
              }  
              //Delete student
                const deletedStudent = await studentRegisterSchema.findOneAndDelete({ _id : id });
                if (deletedStudent) {
                    res.status(200).json({
                        message: "Student deleted successfully"
                    });
                } else {
                    res.status(500).json({
                        message: "Failed to delete student"
                    });
                }
        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }
    },
}