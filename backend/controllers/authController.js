const express = require('express')
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const signup = async(req,res) =>{
    const {name , email , password } = req.body

    try{
        const userExist = await User.findOne({email});
        if(userExist){
           return res.status(400).json({message : 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        });
    }
    catch(err){
        console.error('Error in signup:', err.message);
        res.status(500).json({ message: 'Server error during signup', error: err.message });
    }

}

const login = async(req,res)=>{
    const email = String(req.body.email.trim().toLowerCase());
    const  password  = String(req.body.password);
    
    try{

        const user = await User.findOne({email})
           

        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:'Invalid credentials , password not right'})
        
        const token = jwt.sign({id : user._id, role : user.role},process.env.JWT_SECRET, {expiresIn : '30d' ,})
        res.json({
            id : user._id,
            name : user.name,
            email :user.email,
            role : user.role,
            token
        })
    }
    catch(err){
       res.status(500).json({message: err.message})
    }

}

module.exports = {signup , login}