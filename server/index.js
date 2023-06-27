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

//admin rights
const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        
        next()
    }else{
        res.sendStatus(401)
    }
  }

  //dashboard page once logged in

  app.get('/dashboard',setUser,async(req,res,next)=>{
    try{
        const {token} = req.query
       
    }catch(error){
        console.log(error)
        next(error)
    }
    

})
//post register
app.post("/register", async(req,res,next)=>{
    try{
        const {username, password}= req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({username,password:hash})
        const token = jwt.sign({username, id:user.id, isAdmin: user.isAdmin}, JWT_SECRET)
        
        res.send({message:"foodie registered", token: token})
        //add here res.json to connect with react
      
    }catch(error){
        next(error)
    }
       
  })

  //post for login
  app.post('/login', async(req,res,next)=>{
    try{
        const {username, password} = req.body
        const foundUser = await User.findOne({where:{username}})
        if(!foundUser){
            res.sendStatus(401)
        }else{
            const isMatch = await bcrypt.compare(password, foundUser.password)
            if (!isMatch){
                res.sendStatus(401)
            }else{
              const token= jwt.sign({username, id:foundUser.id, isAdmin: foundUser.isAdmin},JWT_SECRET)
        res.send({ message: 'Welcome to new bee', token: token})
      
      
      
            }
          }
          }catch(error){
    next(error)
  }
})



