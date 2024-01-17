import { useForm } from "react-hook-form"
import { createUser } from "../services/userListAPI"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import { useTheme } from "@emotion/react"
import { useSelector } from "react-redux"
const CreateUser = () => {
    const {token} = useSelector((state)=>state.auth)   
    const navigate = useNavigate()
    const theme = useTheme()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    const onSubmit = (data) => {
       
       createUser(data,navigate,token)
      }
  return (
    <div className="flex items-center justify-center text-white w-full h-screen max-h-[calc(100vh-56px)] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ">
        <div className="w-[800px] p-10 text-white flex flex-col m-auto justify-center items-center bg-black rounded-lg">
            <h1 className="text-3xl">Create User</h1>
            <form className="flex flex-col items-center justify-center gap-y-3 " onSubmit={handleSubmit(onSubmit)}>
                      <span className='flex flex-col gap-y-2'>
                            <label htmlFor="username">Username</label>
                            <input className='border w-96 border-black px-4 py-1 text-black rounded h-10' type="text" name="username" id="username" {...register("UserName",{ required: true },{pattern: /^[A-Za-z\s]+$/ })}/>
                            {errors.UserName && <span className="text-red-500 text-[12px]">*This field is required</span>}
                        </span>
                        <span className='flex flex-col gap-y-2'>
                            <label htmlFor="email">Email</label>
                            <input className='border w-96 border-black px-4 text-black py-1 rounded h-10' type="email" name="email" id="email" {...register("Email",{ required: true },{ pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i })}/>
                            {errors.Email && <span className="text-red-500 text-[12px]">*This field is required</span>}
                        </span>
                        <span className='flex flex-col gap-y-2'>
                            <label htmlFor="phone">Phone</label>
                            <input className='border w-96 border-black text-black px-4 py-1 rounded h-10' type="tel" name="phone" id="phone" {...register("Phone",{ required: true },{ pattern: /^[0-9]{10}$/ })}/>
                            {errors.Phone && <span className="text-red-500 text-[12px]">*This field is required</span>}
                        </span>
                        <div className="flex gap-x-4 mt-2">
                            <Button  type='submit' color="primary" variant="contained">Create</Button>
                            <Button  type='submit' style={{ backgroundColor: theme.palette.primary.danger }}  variant="contained" onClick={()=>navigate('/dashboard')}>Cancel</Button>
                
                            {/* <button  className='bg-red-500 hover:bg-red-400  text-white px-4 py-2 rounded' >Cancel</button> */}

                        </div>
            </form>
        </div>

    </div>
  )
}

export default CreateUser