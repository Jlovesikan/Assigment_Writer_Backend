const express=require("express");
const {addSetings,getallSettings,updateSettings}=require("../contollers/settings.js");
const { uploadImage } = require("../middleware/multer.js");
const router=express.Router();

router.post("/settings/add",uploadImage.fields([
    { name: "websiteLogo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),addSetings);

router.get("/settings/getallsettings",getallSettings)  

router.post("/settings/update/:id",uploadImage.fields([
    { name: "websiteLogo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),updateSettings);

  

  module.exports=router;