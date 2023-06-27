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

//