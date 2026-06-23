const express=require("express");
const {createContact}=require("../contollers/contact.js");
const router=express.Router();

router.post("/contact/new",createContact);

module.exports=router;