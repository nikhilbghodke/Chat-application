const path = require('path');
const express= require("express")
const multer= require("multer")
const User = require("../models/user.js")
const auth=require("../middlewares/auth.js")

const uploadDir= path.join(__dirname,"../../uploads")
var app=express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      req.name=uniqueSuffix+file.originalname
      cb(null,req.name)
    }
  })
  
var upload = multer({ storage: storage }).single('avatar')

//upload profile picture
app.post('/profilePic', auth,async function (req, res) {
    upload(req, res, async function (err) {
      if (err) {
          console.log(JSON.stringify(err))
          return res.status(500).send(err)
      }
      console.log(req.name)
      var user=req.user
      user.avatar=req.name
      await user.save()
      res.send({
          success:true,
          user:user
      })
    })
  })
app.get("/profilePic", auth, async function(req,res,next){
    var img=path.join(__dirname,"../../uploads/"+req.user.avatar)
    res.sendFile(img)
})

app.post("/signup", async (req,res)=>{
   
    var user= new User(req.body)
    try{
        user=await user.save()
        const token= await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})
app.post("/login", async (req,res)=>{
    
    try{
     const  user = await User.findByCredentials(req.body.email,req.body.password)
     const token = await user.generateToken()
     res.send({user,token})
    }
    catch(e){
        res.status(404).send(e)
    }
     
})

app.post("/logout", auth,async (req,res)=>{

    try{
        var token =req.token
        var user=req.user
        user.tokens= user.tokens.filter((t)=>{
            t!=token
        })
        await user.save()
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

app.post("/logoutAll", auth,async (req,res)=>{
    try{
        var user=req.user
        user.tokens= []
        await user.save()
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})


app.get("/me", auth,async (req,res)=>{
    res.send(req.user)
})

app.patch("/users", auth ,async (req,res)=>{

    try{
        var user =req.user
        const keys= Object.keys(req.body)
        keys.forEach((key)=>{
            user[key]=req.body[key]
        })
        //console.log(user)
        user=await user.save()
        res.send(user)
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})


app.get("/users", async (req,res)=>{
    try{
        const users= await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }
})


app.delete("/users", async (req,res)=>{
    await User.deleteMany({})
    res.send("all users deleted")
})

module.exports=app;