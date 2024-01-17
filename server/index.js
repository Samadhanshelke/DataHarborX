const express = require('express');
const app = express();
const multer = require('multer')
const {dbConnect} = require('./config/dbConnect')


const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');
const AuthRoutes  = require('./routes/AuthRoutes')
const UserListingRoutes  = require('./routes/UserListingRoutes')

dotenv.config();
dbConnect();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))




app.use("/api/auth",AuthRoutes)

app.use("/api/listing",UserListingRoutes)



const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})