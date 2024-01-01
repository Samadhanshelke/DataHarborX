import { useForm } from "react-hook-form"
import { createUser } from "../services/userListAPI"
import { useNavigate } from "react-router-dom"

const CreateUser = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    const onSubmit = (data) => {
       
       createUser(data,navigate)
      }
  return (
    <div className="w-11/12 flex flex-col m-auto justify-center items-center mt-6">
         <h1 className="text-3xl">Create User</h1>
        <form className="flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                   <span className='flex flex-col gap-y-2'>
                        <label htmlFor="username">Username</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type="text" name="username" id="username" {...register("UserName",{ required: true })}/>
                        {errors.UserName && <span className="text-red-500 text-[12px]">*This field is required</span>}
                    </span>
                     <span className='flex flex-col gap-y-2'>
                        <label htmlFor="email">Email</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type="email" name="email" id="email" {...register("Email",{ required: true })}/>
                        {errors.Email && <span className="text-red-500 text-[12px]">*This field is required</span>}
                    </span>
                    <span className='flex flex-col gap-y-2'>
                        <label htmlFor="phone">Phone</label>
                        <input className='border w-96 border-black px-4 py-1 rounded' type="tel" name="phone" id="phone" {...register("Phone",{ required: true })}/>
                        {errors.Phone && <span className="text-red-500 text-[12px]">*This field is required</span>}
                    </span>
                    <div className="flex gap-x-4">
                        <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-4 py-2 rounded' >Create</button>
                        <button  className='bg-red-500 hover:bg-red-400  text-white px-4 py-2 rounded' onClick={()=>navigate('/dashboard')}>Cancel</button>

                    </div>
        </form>
    </div>
  )
}

export default CreateUser