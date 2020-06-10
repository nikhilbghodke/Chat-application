const jwt= require("jsonwebtoken")
const User= require("../models/user.js")


const auth= async function(req,res,next){

    try{
        const token= req.header("Authorization").replace("Bearer","").trim()
        const decoded =await jwt.verify(token,"secretkey")
        console.log(decoded)
        const user=await User.findOne({_id:decoded.id, 'tokens.token':token})
        if(!user)
            throw new Error("No such user")
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        //console.log(e.message)
        return next({
            status: 401,
            message: e.message
        })
    }
    
}


module.exports=auth