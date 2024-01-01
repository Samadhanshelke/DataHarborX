import axios from "axios"

import {setUser} from '../slices/profileSlice';
import {setLoading, setToken} from '../slices/authSlice'
import toast from "react-hot-toast";

// sendotp function
export function sendOtp(Email,navigate){
   return async (dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    console.log("email", Email)
    try {
      
          const response = await axios.post('http://localhost:3001/sendotp', {Email})
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

export function signUp( Name,Email,Phone,Password,otp,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    console.log("in signup function", Name,Email,Phone,Password,otp)
    dispatch(setLoading(true))
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        Name,
        Email,
        Phone,
        Password,
        otp
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
    console.log("first")
    axios.post('http://localhost:3001/login',data).then((response)=>{
      console.log(response)
      dispatch(setUser(response.data.user))
      dispatch(setToken(response.data.token))

      localStorage.setItem("user",JSON.stringify(response.data.user))
      localStorage.setItem("token",JSON.stringify(response.data.token))
      toast.success('Login Successfully.');
      navigate("/")
    }).catch((err)=>{
      console.log(err)
    })
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

//forgot otp
export async function forgotPassword(email){
    try {
      const response =await axios.post("http://localhost:3001/reset-password-token",{email})
       if(!response.data.success){
          throw new Error(response.data.message)
       }
       console.log(response);
       toast.success("please check Email")

    } catch (error) {
      console.log(error)
    }
}