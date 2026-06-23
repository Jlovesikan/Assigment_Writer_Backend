const Order =require("../models/Order.js");
const user = require("../models/User.js");

//get number of orders and users
const getDashboard=async(req,res)=>{
    try {
        const totalOrders= await Order.countDocuments();

        const pendingOrders= await Order.countDocuments({
            status:"pending",
        });

        const in_progressOrders= await Order.countDocuments({
            status:"in_progress",
        });

        const completedOrders= await Order.countDocuments({
            status:"completed",
        });

        const deliveredOrders= await Order.countDocuments({
            status:"delivered",
        });

        const cancelOrders= await Order.countDocuments({
            status:"cancel",
        });

        const totalUsers= await user.countDocuments();

        return res.status(200).json({
            success:true,
            message:"Get all Details",
            totalOrders,
            pendingOrders,
            in_progressOrders,
            completedOrders,
            totalUsers,
        });
        
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        });
    }
};

//search option
const searchDoc=async(req,res)=>{
    try {

        const keyword= req.query.keyword||"";

        const orders = await Order.find({

           $or:[
            {title:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}} 
           ] 
          
        });

          if(orders.length === 0){
                return res.json({
                    message:"No Any Order Found",
                }); 
            }

         return res.status(200).json({
            success:true,
            count:orders.length,
            orders,
         });   

        
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        })
    }
}

const filterBystatus=async(req,res)=>{
    try {
      
        const {status}=req.query;
        if(!status){
            return res.status(400).json({
                message:'status not found!..'
            })
        }

        const order = await Order.find({
            status:status,
        })

        return res.status(200).json({
            success:true,
            count:order.length,
            order,
        })
        
    } catch (error) {
        return res.status(400).json({
            message:error.message,
        })
    }
}

module.exports={getDashboard,searchDoc,filterBystatus}
