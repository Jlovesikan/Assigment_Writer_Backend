const Settings=require("../models/Settings.js");
const mongoose=require("mongoose");

//Add Settings
const addSetings=async(req,res)=>{
    try {
      const exits= await Settings.findOne();
      if(exits){
        return res.status(400).json({
            message:"Settings alredy Exits.."
        })
      }
      
      const data=req.body;

      if(req.files?.websiteLogo){
        data.websiteLogo=req.files.websiteLogo[0].path
      }

      if(req.files?.favicon){
        data.favicon=req.files.favicon[0].path
      }

      const settings=await Settings.create(data);
      return res.status(200).json({
        success:true,
        message:"Settings is created",
        settings,
      })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//get all settings
const getallSettings=async(req,res)=>{
  try {
  
    const getallsettings= await Settings.find();
    if(!getallsettings){
      return res.status(400).json({
        message:"no any Settings found.."
      })
    }

    return res.status(200).json({
      success:true,
      message:"find the all settings...",
      getallsettings,
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message,
    })
  }
}

//update settings

const updateSettings=async(req,res)=>{
  try {
      const id =req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        message:"invalid id...."
      })
    };

    const data=req.body;
     if(req.files?.websiteLogo){
      data.websiteLogo=req.files.websiteLogo[0].path
     }

     if(req.files?.favicon){
      data.favicon=req.files.favicon[0].path
     }

    const updatesettings= await Settings.findByIdAndUpdate(id,data,{new:true});

    return res.status(200).json({
      success:true,
      message:"update success full..",
      updatesettings,
    })
    
  } catch (error) {
    return res.status(500).json({
      message:error.message,
    })
  }
}

module.exports={addSetings,getallSettings,updateSettings};