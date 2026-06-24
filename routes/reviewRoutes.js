const express=require("express");
const {createReview,getallReview,deleteReview,getsingleReview,updateReview}=require("../contollers/review.js");
const router =express.Router();

router.post("/review/new",createReview);
router.get("/review/getallReview",getallReview);
router.get("/review/getsingleReview/:id",getsingleReview);
router.delete("/review/deleteReview/:id",deleteReview);
router.get("/review/updateReview/:id",updateReview);

module.exports=router;