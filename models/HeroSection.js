const mongoose=require("mongoose");

const heroSchema=new mongoose.Schema({

title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    buttonText: {
      type: String,
      trim: true,
    },

    buttonLink: {
      type: String,
      trim: true,
    },

    heroImage: {
      type: String,
      required: true,
    },

   
  },{timestamps:true});

  const HeroSection=mongoose.model("HeroSection", heroSchema);

  module.exports=HeroSection;