const controller=require("../Controller/Authcontroller")
module.exports=(app)=>{
    app.post("/crm/api/v1/auth/signup",controller.signup)
}