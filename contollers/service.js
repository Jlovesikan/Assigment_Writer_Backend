const Service = require("../models/Service.js");
const mongoose=require("mongoose");

// Add service
const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
S

    if (!title || !description) {
      return res.status(400).json({
        message: "Upload all content",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const service = await Service.create({
      title,
      description,
      image: req.file.path,
    });

    return res.status(201).json({
      success: true,
      message: "Service Card Added Successfully",
      service,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get All services

const fetchallServices=async(req,res)=>{
    try {
        const services=await Service.find();
        if(!services){
            return res.json({
                message:"No any Services..."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Get all Services...",
            count:services.length,
            services
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//get single services
const fetchOneservice =async(req,res)=>{
    try {
      const id=req.params.id;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:"invalid id"
        })
      }
      
      const fetchoneservice=await Service.findById(id);

      if(!fetchoneservice){
        return res.status(400).json({
            message:"No any service find..."
        })
      }

      return res.status(200).json({
        success:true,
        message:"find one service",
        fetchoneservice,
      })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//update service
const updateService=async(req,res)=>{
    try {

        const{title,description,}=req.body;
       

        const id=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message:"invalid id..."
            })
        }
      const updateservice= await Service.findById(id);
      if(!updateservice){
        return res.json({
            message:"No any services find"
        })
      } 
      
     if(title)updateservice.title=title;
     if(description)updateservice.desvription=description;
     if(req.file)updateservice.image=req.file.path;

     await updateservice.save();

     return res.status(200).json({
        message:"update successful...",
        updateservice,
     })

        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}


//delete services
const deleteServices=async(req,res)=>{
    try {
        const id=req.params.id

        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({
            message:"invalid id...."
          })
        }

        const deleteservice =await Service.findById(id);

        if(!deleteservice){
            return res.status(400).json({
                message:"no any services find",
            })
        }

        await deleteservice.deleteOne();

        return res.status(200).json({
            success:true,
            message:"delete successFull...",
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = { createService,fetchallServices,updateService,deleteServices,fetchOneservice};