const express = require('express');
const app = express();
const multer = require('multer')
const {dbConnect} = require('./config/dbConnect')
const User = require('./model/User')
const {signUp,login,SendOtp,ResetPasswordToken} = require("./Controller/Auth")
const {contactUs} = require("./Controller/ContactUs")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const { getAllUser ,createUser, updateUser, deleteUser, updateProfilePicture} = require('./Controller/UserListing');
dotenv.config();
dbConnect();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./client/public/Images")
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);
    }
})
const upload = multer({storage:storage})


app.post("/signup",signUp)
app.post("/login",login)
app.post("/contactus",contactUs)
app.post("/sendotp",SendOtp)
app.post("/reset-password-token",ResetPasswordToken)
app.get('/getuserlisting',getAllUser)
app.post('/createUser',createUser)
app.put('/edituser/:id',updateUser)
app.delete('/deleteuser/:userId',deleteUser)
app.put('/updateProfilePicture',upload.single("image"),updateProfilePicture)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})