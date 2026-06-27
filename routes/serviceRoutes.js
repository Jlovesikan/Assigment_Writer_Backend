const express=require("express");
const {createService, fetchallServices,updateService,deleteServices}=require("../contollers/service.js");
const { uploadImage } = require("../middleware/multer.js");
const router=express.Router();


router.post("/service/new",uploadImage.single("image"),createService);
router.get("/service/fetchAll",fetchallServices);
router.get("/service/update/:id", uploadImage.single("image"),updateService);
router.delete("/service/delete/:id",deleteServices);

module.exports=router;