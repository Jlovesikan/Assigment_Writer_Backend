const Review=require("../models/Review.js");
const mongoose=require("mongoose");

//create review
const createReview=async(req,res)=>{
    try {
       const {name,email,rating,message}=req.body;

       if(!name||!email||!rating||!message){
        return res.status(400).json({
            message:"Required All Field..."
        })
       }
       
       const review= await Review.create({
        name,
        email,
        rating,
        message
       })

       return res.status(201).json({
        success:true,
        message:"Add Your Review",
        review
       })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//get all review
const getallReview=async(req,res)=>{
    try {

       const reviews=await Review.find().sort({creatredAt:-1});

       if(!reviews){
        return res.json({
            message:"No Reviews",
        });
       }

       return res.status(200).json({
        success:true,
        count:reviews.length,
        reviews
       })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//get single review

const getsingleReview=async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            return res.status(400).json({
                message:"Invalid Id.."
            })
        }

        const singlereview = await Review.findById(id);
        if(!singlereview){
            message:"no any review..."
        }

        return res.status(200).json({
            success:true,
            message:"get single review..",
            singlereview,
        })
    } catch (error) {
       return res.status(500).json({
        message:error.message,
       }) 
    }
}

//delete review
const deleteReview=async(req,res)=>{
    try {

        const id=req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message:"Invalid Id"
            })
        }

       const deletereview=await Review.findById(id);
       
       if(!deletereview){
        return res.json({
            message:"No any reviews"
        })
       }
       
       await deletereview.deleteOne();

       return res.status(200).json({
        success:true,
        message:"delete SuccessFull..."
       }) 
        
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}

//update review

const updateReview=async(req,res)=>{
    try {
        const {name,email,review,message}=req.body;
        
        const id=req.params.id;
        if(!id){
            return res.status(400).json({
                message:"invalid id..."
            })
        }
        const updatereview=await Review.findById(id);
        if(!updatereview){
            return res.status(400).json({
                message:"no any review..."
            })
        }

        if(name)updatereview.name=name;
        if(email)updatereview.email=email;
        if(review)updatereview.review=review;
        if(message)updatereview.message=message;

        await updatereview.save();

        return res.status(200).json({
            success:true,
            message:"update succesfull...",
            updatereview
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })
    }
}


module.exports={createReview,getallReview,deleteReview,getsingleReview,updateReview};