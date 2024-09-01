import jwt from 'jsonwebtoken'
import { User } from '../Model/userModel'


const signToken=()=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken=(user,statusCode,req,res)=>{
    const token=signToken(user._id);
    res.cookie('jwt',token,{
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    user.password=undefined;

    res.status(statusCode).json({
        success: true,
        token,
        data:{
            user,
        }
    })
}

const signUp=async(req, res, next)=>{
    const newUser=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    })
    createSendToken(newUser, 201, req, res)
}

const login=async(req, res, next)=>{
    const {email, password}=req.body;
    if(!email|| !password){
        res.status(400).json({
            success: "fail",
            message: 'Please provide email and password',
        })
    }
    const user=await User.findOne({email}).select('+password');

    if(!user||!(await user.matchPassword(password))){
        res.status(401).json({
            success: "fail",
            message: 'Invalid email or password',
        })
    }
    createSendToken(user, 200, req, res)
};

export {signUp, login}
