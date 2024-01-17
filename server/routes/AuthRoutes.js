const express = require("express")
const router = express.Router()
const {signUp,login,SendOtp,ResetPasswordToken,ResetPassword} = require("../Controller/Auth")
const {contactUs} = require('../Controller/ContactUs')

router.post("/signup",signUp)
router.post("/login",login)
router.post("/contactus",contactUs)
router.post("/sendotp",SendOtp)
router.post("/reset-password-token",ResetPasswordToken)
router.post("/reset-password",ResetPassword)

module.exports = router