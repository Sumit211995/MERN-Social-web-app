//import { Router } from "express";

const router = require("express").Router();
const User = require("../Models/user");

router.post("/register",async(req,res)=>{
    try{
        const newUser= new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        const user=await newUser.save();
        res.status(200).json(user);
        
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        const password=await User.findOne({password: req.body.password });
        !user && res.status(404).json("user not found");
        !password && res.status(404).json("password not found");
        
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;