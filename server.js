const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const orderRoutes=require("./routes/orderRoutes");
const adminRoutes=require("./routes/adminRoutes.js");
const contactRoutes=require("./routes/contactRoutes.js")
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
app.use("/api",contactRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

