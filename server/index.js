const express = require("express")
const app= express()
const {User, Post, sequelize}= require("./db")
const cors = require("cors")
require("dotenv").config()
const bcrypt= require("bcrypt")
const path= require("path")
const jwt = require("jsonwebtoken")
const {JWT_SECRET, PORT} = process.env

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/' , (req,res)=>{
    res.send({message: "Hello foodie !"})
})

//register form
app.get('/register', async(req,res,next)=>{
   //add here logic to which page to send in react
})

// login form
app.get('/login', async(req,res,next)=>{
    // add here logic to which page to send 
})

//authorization middleware
const setUser =(async (req,res,next)=>{
    if(!auth){
        next()
    }else{
        const [,token]= auth.split(" ")
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = payload

        next()
    }
})
