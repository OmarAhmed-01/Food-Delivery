import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if (!user){
            return res.json({success: false, message: "User doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Incorrect password"})
        }
        const token = createToken(user._id);
        res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
} 

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, email} = req.body;
    try {
        //checking if user exists
        const exist = await userModel.findOne({email});
        if (exist){
            return res.json({success: false, message: "User already exists"})
        }
        //validate email formal and password strength
        if (!validator.isEmail(email)){
            return res.json({success: false, message: "Enter a valid email"})
        }

        if (password.length < 8){
            return res.json({success: false, message: "Enter a strong password"})
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export { loginUser, registerUser }