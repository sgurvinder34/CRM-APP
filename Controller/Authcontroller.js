const User=require("../Models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const constants=require("../utils/user")
const user = require("../utils/user")
const configs=require("../Config/db.config")
exports.signup=async(req,res)=>{
    if(req.body.usertype==constants.usertype.engineer){
        req.body.userstatus=constants.userstatus.pending
    }

    const userobj={
        name:req.body.name,
        userId:req.body.userId,
        password:bcrypt.hashSync(req.body.password,8),
        email:req.body.email,
        usertype:req.body.usertype,
        userstatus:req.body.userstatus
    }
    try{
        const userCreated=await User.create(userobj)
        res.status(200).send({
            name:userCreated.name,
            userId:userCreated.userId,
            email:userCreated.email,
            usertype:userCreated.usertype,
            userstatus:userCreated.userstatus
        })
    }
    catch(err){
        console.log("The User was an errror while signup ",err)
        res.status(500).send({
            message:"There was an error from our side while signing up"
        })
    }
    
}
exports.Signin=async(req,res)=>{
    try{
        const finduser=await User.findOne({userId:req.body.userId})
    if(!finduser){
        return res.status(400).send("No such User is present")
    }
    if(finduser.userstatus==constants.userstatus.pending){
        return res.status(400).send("You are Still in pending status")
    }
    const isvalidpassword=bcrypt.compareSync(req.body.password,finduser.password)
    if(!isvalidpassword){
        return res.status(400).send("The password you have entered is wrong")
    }
    const token=jwt.sign({id:finduser.userId,},configs.secret,{expiresIn:86400})

    res.status(200).send({
        name:finduser.name,
        email:finduser.email,
        userId:finduser.userId,
        Usertype:finduser.usertype,
        Userstatus:finduser.userstatus,
        Access_token:token
    })

    }
    catch(err){
        console.log("There was an error while signining in ",err)
        res.status(500).send("There was an error from our side while signing in ")
    }
}