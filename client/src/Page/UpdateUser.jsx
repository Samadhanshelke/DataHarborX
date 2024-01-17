import { useForm } from "react-hook-form"
import {  editUser, getUserList } from "../services/userListAPI"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import {CloudUploadIcon} from '@mui/icons-material';
import { useEffect, useState } from "react"
// import { Button } from "@mui/material"


const UpdateUser = () => {
  const [img,setimg] = useState(null)
  const [previmage,setPrevImage] = useState(null)
  const {token} = useSelector((state)=>state.auth)   
    const navigate = useNavigate()
   
    const {id} = useParams()
    const dispatch = useDispatch();
     const currentValues = JSON.parse(localStorage.getItem("currentUser"))

    

    const userList = useSelector((state)=>state.userLists.userList)
  
    const prevalues = userList.filter((user) => user._id === id);
    
    const { UserName, Email, Phone ,Image} = prevalues.length === 0 ? currentValues :prevalues[0]
    console.log("list in update with id", UserName, Email, Phone ,Image)
     
  //  const [currentImg,setCurrentImg] = useState(Image)
    
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
    useEffect(()=>{
      dispatch(getUserList(token))
    },[dispatch,handleSubmit,token])

   


      function handleInputChange(e){
          
        const file = e.target.files[0];
        console.log(file)
        if (file) {
          setimg(file)
          const reader = new FileReader();
          reader.onloadend = () => {
            setPrevImage(reader.result);
            // setCurrentImg(reader.result)
            console.log("previmage", reader.result);
          };
          reader.readAsDataURL(file);
        }
         
       }
       const onSubmit = (data) => {
        console.log(data)
        const formData = new FormData();
        formData.append('UserName', data.UserName);
        formData.append('Email', data.Email);
        formData.append('Phone', data.Phone);
      
        if (img) {
          formData.append('img', img);
        }
          // editUser(data,img,id,navigate,token)
          editUser(formData, id, navigate, token);
        }

        const VisuallyHiddenInput = styled('input')({
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          bottom: 0,
          left: 0,
          whiteSpace: 'nowrap',
          width: 1,
        });
         
  
       

       
   return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ">
        <div className="w-[800px] p-10 text-black flex flex-col m-auto justify-center items-center bg-white rounded-lg">
            <h1 className="text-3xl mb-6">Update Info</h1>
            <div className="flex gap-x-6 flex-col sm:flex-row">
                
                  <form className="flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col justify-start items-start w-full gap-y-4">          
                                  <span className="border rounded-full p-1">
                                  
                                  {
                                    previmage === null ?
                                  Image.includes("https") ? <img src={Image} className="sm:w-[80px] h-[80px] rounded-full"/> : <img src={`../../public/Images/${Image}`} alt="" className="sm:w-[80px] h-[80px] rounded-full"/> 
                                  : <img src={previmage} alt="" className="sm:w-[80px] h-[80px] rounded-full" />
                                  
                                  }
                                  </span>
                                 
                                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={handleInputChange}>
                                          Upload image
                                           <VisuallyHiddenInput type="file" />
                                  </Button>
                            </div>
                            <span className='flex flex-col gap-y-2'>
                                  <label htmlFor="username">Username</label>
                                  <input className='border w-64 sm:w-96 border-black px-4 py-1 h-10 rounded' type="text" name="username" id="username" {...register("UserName",{ required: true }, {pattern: /^[A-Za-z\s]+$/ })}/>
                                  {errors.UserName && <span className="text-red-500 text-[12px]">*This field is required</span>}
                              </span>
                              <span className='flex flex-col gap-y-2'>
                                  <label htmlFor="email">Email</label>
                                  <input className='border w-64 sm:w-96 border-black px-4 py-1 h-10 rounded' type="email" name="email" id="email" {...register("Email",{ required: true },{ pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i })}/>
                                  {errors.Email && <span className="text-red-500 text-[12px]">*This field is required</span>}
                              </span>
                              <span className='flex flex-col gap-y-2'>
                                  <label htmlFor="phone">Phone</label>
                                  <input className='border w-64 sm:w-96 border-black px-4 py-1 h-10 rounded' type="tel" name="phone" id="phone" {...register("Phone",{ required: true },{ pattern: /^[0-9]{10}$/ })}/>
                                  {errors.Phone && <span className="text-red-500 text-[12px]">*This field is required</span>}
                              </span>

                              <Button variant="contained" type='submit'>
                                  Submit
                              </Button>
                              
                  </form>

            </div>
        </div>

    </div>
  )
}

export default UpdateUser