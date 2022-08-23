const controller=require("../Controller/Authcontroller")
const middlware=require("../Middleware/Auth.middleware")
module.exports=(app)=>{
    app.post("/crm/api/v1/auth/signup",[middlware.validation],controller.signup)
    app.post("/crm/api/v1/auth/signin",controller.Signin)
}