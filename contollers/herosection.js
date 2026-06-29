const HeroSection =require("../models/HeroSection.js");
const mongoose=require("mongoose");
const fs = require("fs");

//add hero
const addHero=async(req,res)=>{
    try {
      const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      }  =req.body;

      if(!title||!subtitle){
        return res.status(400).json({
            message:"Please Fill Title and Subtitle..."
        })
      }

      if(!req.file){
        return res.status(400).json({
            message:"please select the image.."
        })
      }
      
      const herosection =await HeroSection.create({
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      heroImage: req.file.path,
      });

      return res.status(200).json({
        success:true,
        message:"hero section is create",
        herosection,
      });
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//get all hero

const getallHero=async(req,res)=>{
    try {
       const getall =await HeroSection.find();

       if(getall.length===0){
        return res.status(400).json({
            message:"no any hero section find"
        })
       }
       
       return res.status(200).json({
        success:true,
        message:"get all hero section...",
        getall,
       })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//update hero section
const updateHero=async(req,res)=>{
    try {

      const data=req.body;  
      const id=req.params.id;

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:"id not valid"
        })
      }  

      const hero=await HeroSection.findById(id);
      if(!hero){
        return res.status(400).json({
            message:"hero section not found..."
        })
      }

      if(req.file){
        data.heroImage=req.file.path;
      }

      const updatehero=await HeroSection.findByIdAndUpdate(id,data,{new:true,runValidators:true});
      return res.status(200).json({
        success:true,
        message:"updated data...",
        updatehero
      })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//delete hero
const deleteHero=async(req,res)=>{
    try {
         const id=req.params.id;

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:"id not valid"
        })
      }  

      const findhero=await HeroSection.findById(id);
      if(!findhero){
        return res.status(400).json({
            message:"No any hero Section....",
        })
      }

     

        if (HeroSection.heroImage) {
        fs.unlink(HeroSection.heroImage, (err) => {
        if (err) {
            return res.status(400).json({
            message:err.message,
        })
        }
        });
        }

      await HeroSection.findByIdAndDelete(id);

      return res.status(200).json({
        message:"delete hero section..."
      })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

module.exports={addHero,getallHero,updateHero,deleteHero};