const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const otpGenerator = require('otp-generator')
const OTP = require('../model/OTP')
const { mailSender } = require('../utils/mailSender')
const { passwordUpdated } = require('../mail/template/passwordUpdate')
dotenv.config();

exports.SendOtp = async(req,res)=>{
    try {
        // fetch email from req body
        console.log("req body",req.body)
        const { Email } = req.body;
        //check if user already exists
        const checkUserPresent = await User.findOne({ Email });
    
        // if user already exists then return a response
        if (checkUserPresent) {
          return res.status(401).json({
            success: false,
            message: "user already exist",
          });
        }
        //generate otp
        var otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
    
        //check unique otp or not
        let result = await OTP.findOne({ otp: otp });
        while (result) {
          otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          result = await OTP.findOne({ otp: otp });
        }
    
        const otpPayload = { Email, otp };
        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
       
    
        //   return response successfully
        res.status(200).json({
          success: true,
          message: "OTP sent successfully",
          otp
        });
      } catch (error) {
        
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
} 
exports.signUp = async(req,res)=>{
     try {
       
       const {Name,Email,Password,Phone,otp,City,State,Gender,hearAbout} = req.body;
       console.log(req.body)
       console.log("in signup function", Name,Email,Phone,Password,otp,City,State,Gender,hearAbout)
     if(!Name || !Email || !Password || !Phone || !otp || !City || !State || !Gender || !hearAbout){
       return res.status(400).json({
            success:false,
            message:"All field are required"
        })
     }
     const UserExist = await User.findOne({Email});
     console.log(UserExist)
     if(UserExist){
       return res.status(400).json({
            success:false,
            message:"you are already registered, please login"
        })
     }
       //find most recent otp stored for the user
    const recentOtp = await OTP.find({ Email })
    .sort({ createdAt: -1 })
    .limit(1);
 

  //validate otp
  if (recentOtp.length === 0) {
    // otp not found
    return res.status(400).json({
      success: false,
      message: "OTP not found",
    });
  } else if (otp !== recentOtp[0].otp) {
    return res.status(400).json({
      success: false,
      message: "invalid OTP ",
    });
  }

     const hashedPassword = await bcrypt.hash(Password,10);

     const user = await User.create({
        Name,
        Email,
        Password:hashedPassword,
        Phone,
        City:City.value,
        State:State.value,
        Gender,
        hearAbout
     })
      
     return res.status(200).json({
        success:true,
        message:"user registered successfully",
        user:user
     });
     } catch (error) {
        return res.status(500).json({
            success: false,
            message: "usser cannot be registered, please try again later",
          });
     }
   
}

exports.login = async(req,res)=>{
    try {
        const {Email,Password} = req.body;
    if(!Email || !Password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const user = await User.findOne({Email});
   
    if(!user){
        return res.status(400).json({
            success:false,
            message:"please registered first",
        })
    }
     
    if(await bcrypt.compare(Password,user.Password)){
       console.log(user.Email,user._id)
        const payload = {
            Email: user.Email,
            id: user._id
          };
          
          const token = jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: "24h",
          });
         
          user.token = token;
          user.Password = undefined;
          //create cookies and send response
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
    
          res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
          });
      
        

    }
    else{
        return res.status(401).json({
            success:False,
            message:"please fill out correct data"
        })
    }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
    
}

exports.ResetPasswordToken = async(req,res)=>{
  try {
    const {email} = req.body;
    const uuid =  crypto.randomUUID()
    console.log(uuid)
    const userExists = await User.findOne({Email:email})
    if(!userExists){
      return res.json({
        success:false,
        message:"user not registered",
       
      })
    }
   const sendVerificationlink = mailSender(email,"Verification link from DataHarborX",passwordUpdated(email,userExists.Name,uuid))
   return res.json({
    success:true,
    message:"password reset link sent successfully",
    uuid:uuid
   })
    
  } catch (error) {
    return res.json({
      success:false,
      message:"password reset link failed",
     
     })
  }
  
}

exports.ResetPassword = async(req,res)=>{
  try {
    const {Password,Confirm_Password,Email} = req.body;
    console.log(req.body)
    if(!Password || !Confirm_Password || !Email){
      return res.json({
        success:false,
        message:"all fields are required"
      })
    }

    if(Password !== Confirm_Password){
      return res.json({
        success:false,
        message:"password match error"
      })
    }
    const hashedPassword = await bcrypt.hash(Password,10)
    console.log(hashedPassword)
    const user =await User.findOneAndUpdate({Email:Email},{Password:hashedPassword},{new:true})
    console.log(user)
    return res.json({
      success:true,
      message:"password changed successfully",
      data:user
    })
    
  } catch (error) {
    return res.json({
      success:false,
      message:"password change failed"
    })
  }
}