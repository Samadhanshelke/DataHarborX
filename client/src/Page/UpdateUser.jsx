import { useForm } from "react-hook-form"
import {  UpdateProfilePicture, editUser, getUserList } from "../services/userListAPI"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react"


const UpdateUser = () => {
  const [image,setImage] = useState(null)
  const [imageName,setImageName] = useState(null)
    const navigate = useNavigate()
    
    const {id} = useParams()

     const currentValues = JSON.parse(localStorage.getItem("currentUser"))
    const userList = useSelector((state)=>state.userLists.userList)
  
    console.log("list in update",userList)
    const prevalues = userList.filter((user) => user._id === id);
   
    const { UserName, Email, Phone ,Image} = prevalues.length === 0 ? currentValues :prevalues[0]
    // const {Image} = prevalues[0] 
    useEffect(()=>{
      // getUserList()
      localStorage.setItem("currentUser",JSON.stringify({UserName,Email,Phone,Image}))

    },[Image])
    
   
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(
        {
        defaultValues: {
          UserName: UserName,
          Email: Email,
          Phone:Phone
        },
      }
      )

    const onSubmit = (data) => {
      console.log(data)
      
       editUser(data,id,navigate)

      }


      function handleInputChange(e){
           setImage(e.target.files[0])
           console.log(e.target.files[0])
       }

          const handleImageUpload = ()=>{

              UpdateProfilePicture(image,id,setImageName,navigate)
              console.log("imagename",imageName)
          }
          useEffect(()=>{
            JSON.parse(localStorage.getItem("currentUser"))
          },[image])
        
  return (
    <div className="w-11/12 flex flex-col m-auto justify-center items-center mt-6">
         <h1 className="text-3xl mb-6">Update User</h1>
         <div className="flex gap-x-6">
              <div>          
                         <span>
                         {
                          Image === null ? <VscAccount className="text-4xl"/>: <img src={`../../public/Images/${Image}`} className="w-[100px] h-[100px] rounded"/>
                         }
                            
                        
                          </span>
                          <span className='flex flex-col gap-y-2'>
                              <label htmlFor="profile">Profile Picture</label>
                              <input className='border w-80 border-black px-4 py-1 rounded' type="file" name="profile" id="profile"  onChange={handleInputChange}/>
                          </span>
                          <button onClick={handleImageUpload} className="bg-blue-500 hover:bg-blue-400 w-full mt-4 text-white px-2 py-2 rounded">Upload Picture</button>
              </div>
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
                          
                          <button type='submit' className='bg-blue-500 hover:bg-blue-400 w-full  text-white px-2 py-2 rounded' >Update</button>
              </form>

         </div>
    </div>
  )
}

export default UpdateUser