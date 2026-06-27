const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const orderRoutes=require("./routes/orderRoutes");
const adminRoutes=require("./routes/adminRoutes.js");
const contactRoutes=require("./routes/contactRoutes.js");
const reviewRoutes=require("./routes/reviewRoutes.js");
const serviceRoutes=require("./routes/serviceRoutes.js");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});


app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminRoutes);
app.use("/api",contactRoutes);
app.use("/api", reviewRoutes);
app.use("/api",serviceRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

