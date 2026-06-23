const moongoose =require ("mongoose");

const contactSchema= new moongoose.Schema({
    name:{
        type:String,
        require:true,
    },

     email:{
        type:String,
        require:true,
    },

     message:{
        type:String,
        require:true,
    },

   
}, {timestamps:true});


const Contact=moongoose.model("Contact",contactSchema)
module.exports=Contact;