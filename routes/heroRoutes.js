const express=require("express");
const {addHero,getallHero,updateHero,deleteHero}=require("../contollers/herosection.js");
const {uploadImage}=require("../middleware/multer.js");
const router=express.Router();

router.post("/heroSection/addHero",uploadImage.single("heroImage"),addHero);
router.get("/heroSection/getHero",getallHero);
router.post("/heroSection/updateHero/:id",uploadImage.single("heroImage"),updateHero);
router.delete("/heroSection/deleteHero/:id",deleteHero);

module.exports=router;