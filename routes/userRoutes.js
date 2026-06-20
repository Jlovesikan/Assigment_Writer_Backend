const express = require("express");
const { userRegistraion, verifyUser,loginUser, Profile } = require("../contollers/userController.js");
const isAuth = require("../middleware/isAuth.js")
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Users API working");
});

router.post("/user/register",  userRegistraion);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/profile",isAuth,  Profile);

module.exports = router;