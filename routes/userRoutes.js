const express = require("express");
const { userRegistraion, verifyUser } = require("../contollers/userController.js");

const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Users API working");
});

router.post("/user/register",  userRegistraion);
router.post("/user/verify", verifyUser);

module.exports = router;