
import { useForm } from "react-hook-form"
// import {useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authAPI";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import loginImg from '../../Assets/Images/login.webp'



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
   
 
   

  const onSubmit = (data) => {
      const {Email,Password} = data
     
      if(Email === '' || Password === ''){
        toast.error('All Fields Required')
        return
      }
      console.log(Password.length)
  
      dispatch(login(data,navigate))
  }
 
  return (
        <div className="flex items-center justify-center w-full h-screen  max-h-[calc(100vh-56px)] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ">
            <div className='w-[900px] m-auto gap-x-6  flex justify-center rounded-lg h-[400px] items-center bg-white' >
                <div>
                    <img src={loginImg} alt="" className='h-[200px] w-[200px]'/>
                  
                </div>
                <div className="flex flex-col gap-y-10 justify-center items-center">
                     <h1 className="text-2xl font-semibold text-gray-800">Member Login</h1>
                    <form className='flex flex-col gap-y-10' onSubmit={handleSubmit(onSubmit)}>
                        <span className='flex flex-col gap-y-2'>
                            {/* <label htmlFor="email">Email</label> */}
                            <input className='border w-72 border-black px-4 py-1 rounded-lg h-10' placeholder="Email" type="email" name="email" id="email" {...register("Email",{ pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i })}/>
                            {errors.Email && <span className="text-red-500 text-[12px]">*Email Must be valid</span>}
                        </span>
                        <span className='flex flex-col gap-y-2'>
                            {/* <label htmlFor="password">Password</label> */}
                            <input className='border w-72 border-black px-4 py-1 rounded-lg h-10' placeholder="Password" type="password" name="password" id="password" {...register("Password", {  maxLength: 8 })}/>
                            {errors.Password && <span className="text-red-500 text-[12px]">*Password must be valid</span>}
                        </span>
                      
                        <Button variant="contained" type='submit' className="rounded-lg">
                          Login
                      </Button>

                        
                    </form>
                    <div className="mt-2 text-right text-gray-700">
                      <Link to={'/reset-password'}>Forgot Password?</Link>
                    </div>

                </div>
            </div>

        </div>
  
  )
}

export default Login
