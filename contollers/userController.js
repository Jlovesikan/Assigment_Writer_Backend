const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendMail = require('../middleware/sendMail.js')

const userRegistraion =async(req,res)=>{
    try {

        let {name,email,password,contact}=req.body;

        const emailExist =await User.findOne({email});

        if (emailExist){
            return res.status(400).json({
                message:'User Is Alredy Exist...'
            });
        }

        const hashPassword= await bcrypt.hash(password,10);

        const otp =Math.floor(100000 + Math.random() * 900000);
      
        const user = {
            name,
            email,
            password: hashPassword,
            contact,
        };
        
        const activationToken = jwt .sign({user,otp}, process.env.ACTIVATION_SECRET,{
            expiresIn:'5m',
        }) ;

        const message =`Please Verify Your OTP Number ${otp}`;

        await sendMail(email,'Welcome to WOOCURS ACCADEMY', message);

        return res.status(200).json({
            message:'OTP Send Your Email',
            activationToken,
        })
        
    } catch (error) {
       return res.status(500).json({
        message:error.message,
       })
    }

   


};

 const verifyUser=async (req,res)=>{
       try {
        const {activationToken,otp}=req.body;
        const verifyOtp=jwt.verify(activationToken,process.env.ACTIVATION_SECRET);
        if(!verifyOtp){
            return res.json({
                message:'OTP is Expried',
            });
        };

        if(verifyOtp.otp !== otp){
            return res.json({
              message:"Wrong OTP...." 
            });
        }

        await User.create({
        name: verifyOtp.user.name,
        email: verifyOtp.user.email,
        password: verifyOtp.user.password,
        contact: verifyOtp.user.contact,
        });

        return res.status(200).json({
            message:'User Registration Is Success...'
        })
       } catch (error) {
        return res.status(500).json({
              message: error.message
        });
       }
    };

module.exports = {userRegistraion,verifyUser};