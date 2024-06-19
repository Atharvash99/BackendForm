const bcrypt = require('bcrypt');
const userSchema = require("../Model/userSchema");

const signUp = async (req,res) => {
    try{
    const {email,password} = req.body;
    const userData = new userSchema(req.body);
    console.log(req.body);
    
       const userExist = await userSchema.findOne({email: req.body.email});
       if(userExist){
        return res.status(400).json({
            status: 400,
            error: "Email already exist"
        })
       }
       const salt = await bcrypt.genSalt(10);
       const new_password= await bcrypt.hash(password,salt);
       
       console.log("data", new_password)
       userData.password = new_password;

       const addData = await userData.save();
       res.status(200).json({
        status: "success",
        message: "Signup successfully",
        addData
       })
    }catch(error){
        res.status(500).json({
            status: "failed",
            message: "something goes wrong"
        })
    }
}

const signIn = async (req,res) => {
    try{
      const {email,password} = req.body;
      if(email && password){
        const user = await userSchema.findOne({email: email});
        if(user != null){
            const isMatch = await bcrypt.compare(password, user.password)
            if(user.email == email && isMatch){
                res.status(200).json({
                 status: "success",
                 message: "Login success"
                })
            }else{
                res.send({
                    status: "failed",
                    message: "email or password is not valid",
                })
            }
        }else{
            res.send({
                status: "failed",
                message: "You are not register user"
            })
        }
      }
    }catch(error){
        res.status(500).json({
            status :"failed",
            message: "something goes wrong"
        })
    }
}

module.exports = {signUp,signIn};