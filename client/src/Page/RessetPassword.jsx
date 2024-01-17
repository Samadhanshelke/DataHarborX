import { useState } from "react";
import { useForm } from "react-hook-form"

import { IoEyeOutline,IoEyeOffOutline } from "react-icons/io5";
import { ResetPassword } from "../services/authAPI";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const RessetPassword = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  // const {uuid} = useSelector((state)=>state.auth);
  const uuid = JSON.parse(localStorage.getItem('uuid'))
  console.log('id and uuid',id , uuid)
 const [eye, setEye] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()
   
  const onSubmit = () => {
    if(id != uuid){
      toast.error('Password token is invalid');
      return
    }
    // console.log(data)
    const {Password,Confirm_Password,Email} = getValues()
    if(Password === Confirm_Password){
      console.log("pass matches")
       ResetPassword(Password,Confirm_Password,Email,navigate)
       localStorage.removeItem('uuid')
    } 


  }

 
  return (
    <div className="flex flex-col items-center justify-center m-auto mt-6">
       <h1 className="text-3xl mb-4">Change Password</h1>
       <form className='flex flex-col gap-y-6' onSubmit={handleSubmit(onSubmit)}>
                  <span className='flex flex-col gap-y-2 '>
                        <label htmlFor="email">Email</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type='email' name="email" id="email" {...register("Email",{ required: true })} />
                        {errors.Email && <span className="text-red-500 text-[12px]"> *This field is required </span>}
                       
                        
                    </span>
               <span className='flex flex-col gap-y-2 relative'>
                        <label htmlFor="password">Password</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type={eye ? "text": "password"} name="password" id="password" {...register("Password",{ required: true })} />
                        {errors.Password && <span className="text-red-500 text-[12px]"> *This field is required </span>}
                        {
                          eye ? <IoEyeOffOutline className="absolute right-2 top-10" onClick={()=>{setEye(!eye)}}/> : <IoEyeOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/>
                        }
                        
                    </span>
                    <span className='flex flex-col gap-y-2 relative'>
                        <label htmlFor="confirm-password">Password</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type={eye ? "text": "password"} name="confirm-password" id="confirm-password" {...register("Confirm_Password", { required: true })}/>
                        {errors.Confirm_Password && <span className="text-red-500 text-[12px]">*This field is required</span>}
                        {
                          eye ? <IoEyeOffOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/> : <IoEyeOutline className="absolute right-2 top-10" onClick={()=> setEye(!eye)}/>
                        }
                    </span>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-2 py-2 rounded' >Change Password</button>
                </form>
    </div>
  )
}

export default RessetPassword