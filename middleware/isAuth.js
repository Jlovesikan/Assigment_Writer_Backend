const jwt = require("jsonwebtoken");
const User = require("../models/User.js")

const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers.token;
        if(!token){
            return res.status(403).json({
                message:"Please Login To Access..."
            });
        };
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decodeToken._id);
        next();
        
    } catch (error) {
      return res.status(403).json({
        message:error.message,
      });
    };
};

module.exports=isAuth;