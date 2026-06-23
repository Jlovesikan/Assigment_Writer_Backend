const Contact =require("../models/Contact.js");

const createContact=async(req,res)=>{
    try {
        const {name,email,message}=req.body;

        if(!name||!email||!message){
            return res.status(400).json({
                success:false,
                message:"All Filed Are Require",
            })
        }

        const contact=await Contact.create({
            name,
            email,
            message,
        });

        return res.status(201).json({
            success:true,
            message:"Your Message Is Send...",
            contact,
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

module.exports={createContact}