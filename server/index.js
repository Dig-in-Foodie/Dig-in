const express = require("express")
const app = express()
const {User, Post, sequelize}= require("./db")
const cors = require("cors")
require("dotenv").config()
const {JWT_SECRET, PORT} = process.env
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const path= require("path")


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/' , (req,res)=>{
    res.json({message: "Hello foodie !"})
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
    const auth = req.header('Authorization')
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
        res.send({ message: 'Welcome to Dig in ', token: token})
      
      
      
            }
          }
          }catch(error){
    next(error)
  }
})

//route that will log out from navbar
app.get('/logout',async(req,res,next)=>{
    try{
        req.user = null
        res.clearCookie('token')
        res.redirect('/')
    }catch(error){
        next(error)
    }
})

//create users as administrator.
app.post('/users', setUser, admin, async (req, res, next) => {
    try {
      const {username, password,isAdmin} = req.body;
      const hash = await bcrypt.hash(password, 10)
      const user = await User.create({username, password: hash, isAdmin:true})
      const token = jwt.sign({username, id:user.id, isAdmin: user.isAdmin}, JWT_SECRET)
      res.send({message: "user foodiemunchinadmin registered ", token: token})
  
    } catch (error) {
      console.error(error);
      next(error)
    }
  });


  //get all users
  app.get('/users', setUser, async(req,res, next)=>{
    const usersall = await User.findAll(); 
    res.send(usersall)
}
)

//get all posts in dashboard once logged in 
app.get('/posts', setUser, async(req,res,next)=>{
    const postsall = await Post.findAll(); 
    res.send(postsall)
//     try{
       
//     if(req.user){
//         const postsLogin = await Post.findAll()
//         // const postsUser = await User.findByPk(req.user.id);
//         res.status(200).json(postsLogin)
        
        
//     }else{
//         res.sendStatus(401)   
//     }
    
// }catch(error){
//     console.log(error)
//     next(error)
// }
})
//get the post you created(by id)

app.get('/posts/:id',setUser, async(req,res,next)=>{
    try{
        const post = await Post.findByPk(req.params.id)
        if(!req.user){
            res.sendStatus(401)
        }else if(req.user.id !== post.userId){
            res.sendStatus(401)
        }else{
            res.json({title: post.title, image: post.image, country: post.country, city: post.city, description: post.description})
        }
    }catch(error){
        next(error)
    }
})

//creating a foodie post 

app.post('/posts',setUser, async(req,res,next)=>{
    try{
        if(!req.user){
            res.send(401)
        }else{
            const {title, image , country, city, description}= req.body
            const post = await Post.create({userId: req.user.id, title,image,country,city,description})
            res.sendStatus(201)({title: post.title, image: post.image, country: post.country, city: post.city, description: post.description})
        }
    }catch(error){
        next(error)
    }
})

//delete post only if you are user //fix bug
app.delete('/posts/:id', setUser,async(req,res,next)=>{
    try{
        const post = await Post.findByPk(req.params.id)
        if(!req.user){
            res.sendStatus(401)
        }else if(req.user.id !== post.userId && !req.user.isAdmin){
            res.sendStatus(401)
        }else{
            await post.destroy()
            res.sendStatus(204)
        }
    }catch(error){
        next(error)
    }
})
//update post only if you are user
app.put('/posts/:id', setUser, async(req,res,next)=>{
    try{
        if(!req.user){
            res.sendStatus(401)
            }else{
                    const {title,image,country,city,description} = req.body;
                    const post = await Post.findByPk(req.params.id)
                    if(!post){
                        res.sendStatus(404)
                    }else if(post.userId !== req.user.id && !req.user.isAdmin){
                        res.sendStatus(403)
            }else{
                await post.update({title,image,country,city,description})
                res.sendStatus(200).json({
                    title: post.title,
                    image: post.image,
                    country: post.country,
                    city: post.city,
                    description: post.description
                })
            }
            
        }
            
    }catch(error){
        next(error)
    }
})


app.listen(PORT, () =>{
    sequelize.sync({force: false})
    console.log(`Food is ready ! at http://localhost:${PORT}`);
});