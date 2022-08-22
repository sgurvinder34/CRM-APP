const User=require("../Models/user.model")
const bcrypt=require("bcrypt")
const json=require("jsonwebtoken")
const constants=require("../utils/user")
const user = require("../utils/user")
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