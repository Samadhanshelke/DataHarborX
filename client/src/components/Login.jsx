
import { useForm } from "react-hook-form"
// import {useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authAPI";
import { useDispatch } from "react-redux";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
   
  //  const {user} = useSelector((state)=>state.profile);
   

  const onSubmit = (data) => {
    console.log(data,"in login onsubmit fn")
      dispatch(login(data,navigate))
  }
 
  return (
   
        <div className='w-11/12 m-auto flex justify-center items-center gap-x-20 mt-[50px]' >
            <div>
                <img src="./Images/login.jpg" alt="" className='h-[300px] w-[400px]'/>
            </div>
            <div>
                <form className='flex flex-col gap-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="email">Email</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type="email" name="email" id="email" {...register("Email",{ required: true })}/>
                        {errors.Email && <span className="text-red-500 text-[12px]">*This field is required</span>}
                    </span>
                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="password">Password</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type="password" name="password" id="password" {...register("Password",{ required: true })}/>
                        {errors.Password && <span className="text-red-500 text-[12px]">*This field is required</span>}
                    </span>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded' >LogIn</button>
                </form>
                <div className="mt-2 text-right text-gray-700">
                  <Link to={'/reset-password'}>Forgot Password?</Link>
                </div>

            </div>
        </div>
  
  )
}

export default Login
