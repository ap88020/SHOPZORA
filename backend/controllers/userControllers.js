import validator from "validator";
import userModel from '../models/userModel.js'
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";
import jwt from 'jsonwebtoken';

// Route for User registeration
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({email});

        if(exists){
            return res.status(409).json({success:false , message:"User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({success:false , message:"Please enter a valid email"});
        }

        if(password.length < 6){
            return res.status(400).json({success:false , message:"Please enter a strong password"});
        }

        // hassing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashPassword,
        })

        const user = await newUser.save();
        const token = generateToken(user._id);

        res.status(200).json({success:true, token});

    } catch (error) {
        console.log(error);
        res.status(400).json({success:false , message:error.message});
    }
}

// Route for User Login
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({success:false , message: "User doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = generateToken(user._id);
            return res.status(200).json({success:true , token: token});
        }else{
            return res.status(400).json({success:false , message:"Invalid credentials"});
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({success:false , message:error.message});
    }
}

// Route for Admin login 
const adminLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.status(200).json({success:true, token});
        }else{
            res.status(400).json({success:false , message:"Invalid Credentials"});
        }
    } catch (error) {
        res.status(400).json({success:true , message:error.message});
    }
}

export {loginUser , registerUser , adminLogin};