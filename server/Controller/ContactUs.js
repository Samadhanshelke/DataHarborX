const nodemailer = require("nodemailer");
const {mailSender} = require("../utils/mailSender")
const {contactUsEmail}= require("../mail/template/ContactFormRes");
exports.contactUs = async (req,res)=>{
    try {
        console.log("contactus",req.body)
        const {Email,Message,Subject,Phone} = req.body;
        const SentMail = await mailSender(
            Email,
            Subject,
            
            contactUsEmail(Email,Message,Phone)
        )
       
        return res.status(200).json({
            success:true,
            message:"sent successfully"
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message:"error occured in contact section"
        })
    }

}