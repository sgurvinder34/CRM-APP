const User=require("../Models/user.model")
const { usertype } = require("../utils/user")
const constants=require("../utils/user")

const validation=async(req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send("Name is Required")
    }
    if(!req.body.userId){
        return res.status(400).send("UserId is Required")
    }
    try{
        const find=await User.findOne({userId:req.body.userId})
        if(find){
            return res.status(400).send("UserId is already taken")
        }
    }
    catch(err){
        console.log("There was an error in middleware/validation/userId",err)
        return res.status(500).send("There was an error from our side ")
    }
    if(!req.body.password){
        return res.status(400).send("Password Required")
    }
    if(!req.body.email){
        return res.status(400).send("Email id required")
    }
    try{
        const validemail=await User.findOne({email:req.body.email})
        if(validemail){
            return res.status(400).send("Email id already taken")
        }
    }
    catch(err){
        console.log("There is an error in middleware/validation/email",err)
        res.status(500).send("There was an error from our side")
    }
    if(!usertype){
        return res.status(400).send("Usertype Required")
    }
    if(req.body.usertype==constants.usertype.admin){
        return res.status(400).send("Admin Cant be registered")
    }
    const users=[constants.usertype.customer,constants.usertype.engineer]
    if(!users.includes(req.body.usertype)){
        return res.status(400).send("The UserType you have entered is not valid")
    }
    next()

}

const middlewarevalidation={
    validation:validation
}

module.exports=middlewarevalidation