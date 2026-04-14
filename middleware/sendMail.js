const nodemailer = require("nodemailer");

const SendMail =async(email,subject,text) => {
    try {

        const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        auth:{
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
       },
    });

    await transport.sendMail({
         from:process.env.GMAIL,
         to:email,
         subject,
         text,
    })

        
    } catch (error) {
        console.log(error);
    }
    
};
module.exports=SendMail;