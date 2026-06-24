const express=require("express");
const {createReview,getallReview,deleteReview}=require("../contollers/review.js");
const router =express.Router();

router.post("/review/new",createReview);
router.get("/review/getallReview",getallReview);
router.delete("/review/deleteReview/:id",deleteReview);

module.exports=router;