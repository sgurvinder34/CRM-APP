const mongoose=require("mongoose")
const { userstatus } = require("../utils/user")
let constants=require("../utils/user")

const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        lowerCase:true,
        unique:true
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    },
    usertype:{
        type:String,
        required:true,
        default:constants.usertype.customer,
        enum:[constants.usertype.admin,constants.usertype.engineer,constants.usertype.customer]
    },
    userstatus:{
        type:String,
        required:true,
        default:constants.userstatus.approved,
        enum:[constants.userstatus.rejeceted,constants.userstatus.pending,constants.userstatus.approved]
    }
})

module.exports=mongoose.model("User",Userschema)