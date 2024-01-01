import axios from "axios";
import {setUserList} from '../slices/userListingSlice'
import toast from "react-hot-toast";
const URL ="https://dataharborx.onrender.com"
export function getUserList(){
    
   return async(dispatch)=>{
       await axios.get(`${URL}/getuserlisting`).then((response)=>{
         
               console.log("all users",response.data.users)
               localStorage.setItem("updateuser", JSON.stringify(response.data.users))
               dispatch(setUserList(response.data.users))
               
           

       }).catch((err)=>{
        console.log(err)
       })


   }
}
export async function createUser(data,navigate){
    try {
        const response = await axios.post(`${URL}/createUser`,data)
        console.log("new user",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("User Created Successfully")
        navigate('/dashboard')
    } catch (error) {
        toast.error("creation Failed")
        navigate("/dashboard")
        console.log(error)
    }
    
}

export async function editUser(data,id,navigate){
    try {
        console.log(id)
    const {UserName,Email,Phone} = data
    const response = await axios.put(`${URL}/${id}`,{UserName,Email,Phone,id})
    console.log("response from update user",response)
    if(!response.data.success){
        throw new Error(response.data.message)
    }
    toast.success("edit User Successfully")
    navigate('/dashboard')
    } catch (error) {
        toast.error("edit user Failed")
        navigate("/dashboard")
        console.log(error)
    } 
}

export async function deleteUser(userId,navigate){
    try {
        console.log("deleteuserid",userId)
        const response = await axios.delete(`${URL}/deleteuser/${userId}`)
        console.log(response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success(" User deleted Successfully")
        navigate('/dashboard')
    } catch (error) {
        toast.error("delete user Failed")
        navigate("/dashboard")
        console.log(error)
    }
}

export async function UpdateProfilePicture(image,id,setImageName,navigate){
  try {
    const response = await axios.put(`${URL}/updateProfilePicture`,{image,id},
    {
        headers:{"Content-Type":"multipart/form-data"},
    })
        console.log(response.data.user)
        localStorage.setItem("updateuser", JSON.stringify(response.data.user))
        setImageName(response.data.user.Image)
        // navigate(`/dashboard`)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success(" User deleted Successfully")
  } catch (error) {
    toast.error("picture upload failed Failed")
   
    console.log(error)
  }
}