const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const registerUser = asynchandler(async(req,res) => {
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }
    const alreadyRegistered = await User.findOne({email});
    if(alreadyRegistered){
        res.status(400);
        throw new Error("User already registered");
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });
    if(user){
        res.status(201).json({_id: user.id , email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is invalid");
    }
    res.status(200).json(user);
});

const loginUser = asynchandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"});
        res.status(200).json(accessToken);     
    }else{
        res.status(400);
        throw new Error("Either User not find or password is Incorrect");
    }
});

const currentUser = asynchandler(async(req, res) => {
    // const current = await User.find();
    res.status(200).json({message:"current user"});
});

module.exports = {registerUser, loginUser, currentUser};