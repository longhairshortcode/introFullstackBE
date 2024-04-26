const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

signUp: async (req, res) => {
    try{
        const {name, email, password} = req.body
        const existingUser = await userSchema.findOne({ email })
        if (existingUser){
            return res.status(409).json({
                message: "This user already exists"
            })
        }
        if( name && email && password){
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = await userSchema.create({
                name: name,
                email: email,
                password: hashedPassword,
            })
            if (newUser){
                res.status(201).json({
                    name: newUser.name,
                    email: newUser.email,
                    id: newUser._id,
                    message: "Account created successfully"
                })
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
},

login: async (req, res) => {
    try{
        const {email, password} = req.body
        const existingUser = await userSchema.findOne({email})
        if (!existingUser){
            return res.status(404).json({
                message: "This user doesn't exist"
            })
        }
        if (existingUser){
            const isPasswordValid = bcrypt.compare(password, existingUser.password)
            if (isPasswordValid){
                return res.status(200).json({
                    name: existingUser.name,
                    email: existingUser.email,
                    id: existingUser._id,
                    message: "login successful"
                })
            }else{
                return res.status(401).json({
                    message: "Incorrect password"
                })
            }
        } 
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

}