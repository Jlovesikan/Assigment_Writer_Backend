const mongoose =require("mongoose");
const { applyTimestamps } = require("./User");

const settingsSchema= new mongoose.Schema({
    websiteName: { type: String, required: true },

    websiteDescription: String,
    websiteKeywords: String,
    websiteAuthor: String,

    websiteLogo: String,
    favicon: String,

    supportEmail: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    whatsappNumber: String,

    address: String,
    googleMap: String,

    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    twitter: String,

    copyright: String,

    status: {
  type: Boolean,
  default: true,
},

createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

updatedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
} ,{timestamps: true });

const Settings= mongoose .model("Settings",settingsSchema);
module.exports=Settings;