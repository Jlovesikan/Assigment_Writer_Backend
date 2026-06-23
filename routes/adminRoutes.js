const express=require("express");
const {getDashboard,searchDoc,filterBystatus}=require("../contollers/admin.js");
const router =express.Router();

router.get("/admin/adminCount",getDashboard);
router.get("/admin/search",searchDoc);
router.get("/admin/status",filterBystatus);


module.exports=router;