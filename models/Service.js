const mongoose=require("mongoose");

const serviceSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },

        description:{
            type:String,
            required:true,
        },

        image:{
            type:String,
            default:"",
        }
    },
 {timestamps:true});

 const service=mongoose.model("service",serviceSchema);
 module.exports=service;