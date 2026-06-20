const Order = require("../models/Order");
const mongoose=require('mongoose');
const { rm } = require("fs/promises");


//insert order

const addOrder = async (req, res) => {
  try {
 
    const {
      title,
      description,
      subject,
      deadline,
      wordCount,
      budget,
    } = req.body;

    // uploaded files from multer
    const files = req.files || [];

    // format files for DB
    const formattedFiles = files.map((file) => ({
      fileName: file.originalname,
      filePath: file.path,
    }));

    const newOrder = await Order.create({
      customerId: req.user.id, // from auth middleware
      title,
      description,
      subject,
      deadline,
      wordCount,
      budget,
      files: formattedFiles,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//read all order
const fetchallOrders= async (req,res)=>{
  try {
    const orders=await Order.find();
    return res.status(200).json({
      message:'Find All Orders',
      orders,
    })
    
  } catch (error) {
    return res.status(500).json({
       message:error.message,
    });
    
  }
};

//read one order
const fetchoneOrder=async (req,res)=>{
  try {
    const id= req.params.id;
     
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"invalid id",})
    }

    const order= await Order.findById(id);
    if(!order){
     return res.status(400).json({message:"No Any Order",})
    }
    return res.status(200).json({
      message:'Find One Order',
      order,
    })
  } catch (error) {
    return res.status(400).json({
      message:error.message,
    })
  }
};

//delete order
const deleteOrder=async (req,res)=>{
    try {

    const id= req.params.id;
     
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message:"invalid id",})
    };
    
    const order= await Order.findById(id);
    if(!order){
     return res.status(400).json({message:"No Any Order",})
    };
    
    await rm(order.files[0].filePath,()=>{
      return res.json({
        message:"File deleted"
      })
    });

    await Order.findByIdAndDelete(id);
    return res.json({
      message:'order is deleted'
    })
        
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        })
    }
}

//update order
const updateOne=async (req,res)=>{
 try {
  const id=req.params.id;

  if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(400).json({
    message:"Invalid Id"
  });
}
  const orderExit=await Order.findOne({_id:id});
  if(!orderExit){
    return res.status(400).json({
      message:'User not Exits'
    })
  }
  const orderUpdate=await Order.findByIdAndUpdate(id,req.body,{new:true});
  return res.status(201).json({
    message:"User Updated",
    order: orderUpdate,
  })
 } catch (error) {
  return res.status(400).json({
      message:error.message,

    });
 }
}

//order status update
const statusUpdate=async(req,res)=>{
  try {
    const {status}=req.body;
    const orderStatus=await Order.findById(req.params.id);
    if(!orderStatus){
      return res.status(400).json({
        message:'Order Not Found...'
      });
    };
  if(orderStatus.status === "delivered"){
   return res.status(400).json({
      message:"Already delivered"
   });
}
    orderStatus.status=status;
    await orderStatus.save();
    return res.status(201).json({
      success:true,
      message:'Update Order Status...',
      orderStatus,
    })
    
  } catch (error) {
    return res.status(400).json({
      message:error.message,
    })
  }
}
module.exports = { addOrder,fetchallOrders,fetchoneOrder,deleteOrder,updateOne,statusUpdate };