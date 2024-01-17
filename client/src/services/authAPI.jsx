import axios from "axios"

import {setUser} from '../slices/profileSlice';
import {setLoading, setToken, setUuid} from '../slices/authSlice'
import toast from "react-hot-toast";
// const URL ="https://dataharborx.onrender.com"
const URL ="http://localhost:3001/api/auth"
// sendotp function
export function sendOtp(Email,navigate){
   return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    console.log("email", Email)
    try {
      
          const response = await axios.post(`${URL}/sendotp`, {Email})
          console.log(response)
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
    
          toast.success("OTP Sent Successfully")
          navigate("/verify-email")
        } catch (error) {
          
          toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
   }
}

//signup function

export function signUp( Name,Email,Phone,Password,otp,City,State,Gender,hearAbout,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    console.log("in signup function", Name,Email,Phone,Password,otp,City,State,Gender,hearAbout)
    dispatch(setLoading(true))
    try {
      const response = await axios.post(`${URL}/signup`, {
        Name,
        Email,
        Phone,
        Password,
        otp,
        City,
        State,
        Gender,
        hearAbout
      })
  
      
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login") 
    } catch (error) {
      
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



//login function
export function login(data,navigate){
  return async (dispatch)=>{
    try {
      axios.post(`${URL}/login`,data).then((response)=>{
        console.log(response)
        dispatch(setUser(response.data.user))
        dispatch(setToken(response.data.token))
  
        localStorage.setItem("user",JSON.stringify(response.data.user))
        localStorage.setItem("token",JSON.stringify(response.data.token))
        toast.success('Login Successfully.');
        navigate("/")
      }).catch(()=>{
        toast.error('invalid credential')
      })
    } catch (error) {
      toast.error('invalid credential')
      console.log(error)
    }
   

  }
    
}

//logout
export function logout(navigate){
  return async (dispatch)=>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    dispatch(setUser(null))
    dispatch(setToken(null))
  toast.success("logout successfully")
   navigate("/")

  }
}

export function forgotPassword(email,navigate){
  return async (dispatch)=>{
        try {
          const response =await axios.post(`${URL}/reset-password-token`,{email})
          if(!response.data.success){
              throw new Error(response.data.message)
          }
          console.log(response);
          dispatch(setUuid(response.data.uuid))
          localStorage.setItem('uuid',JSON.stringify(response.data.uuid))
          toast.success("please check Email")
          navigate('/')
      
        } catch (error) {
          console.log(error)
        }

  }
}


export async function ResetPassword(Password,Confirm_Password,Email,navigate){
  try {
    const response =await axios.post(`${URL}/reset-password`,{Password,Confirm_Password,Email});
    if(!response.data.success){
      throw new Error(response.data.message)
   }
   console.log(response);
   toast.success("Password Changed Successfully,Please login")
   navigate('/login')
  } catch (error) {
    console.log(error)
  }

}