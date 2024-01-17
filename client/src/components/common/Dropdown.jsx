import { IoIosLogOut } from "react-icons/io";
import { FaPaintBrush } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { VscHome } from "react-icons/vsc";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import {logout} from '../../services/authAPI'
const Dropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutUser = ()=>{
        
       dispatch(logout(navigate))
    }
  return (
    <div className="bg-gray-600 sm:bg-black text-white p-4 rounded-md flex flex-col gap-y-2 relative">
    <div className="flex items-center gap-x-1 cursor-pointer w-[120px] hover:bg-white hover:px-2 rounded hover:text-black" onClick={()=>{navigate('/')}}>
         <VscHome className="text-red-300"/>
         <span>Home</span>
      </div>
      <div className="flex items-center gap-x-1 cursor-pointer w-[120px] hover:bg-white hover:px-2 rounded hover:text-black" onClick={()=>{navigate('/dashboard')}}>
         <MdOutlineSpaceDashboard className="text-red-300"/>
         <span>Dashboard</span>
      </div>
     <div className="flex items-center gap-x-1 cursor-pointer hover:bg-white hover:px-2 rounded hover:text-black">
         <FaPaintBrush className="text-red-300"/>
         <span>Manage</span>
      </div>
      <div className="flex items-center gap-x-1 cursor-pointer hover:bg-white hover:px-2 rounded hover:text-black" onClick={logoutUser}>
         <IoIosLogOut className="text-red-300"/>
         <span>Logout</span>
      </div>
     
      
     
      <div className="absolute w-4 top-[-8px] left-[50%] h-4 bg-gray-600 sm:bg-black rotate-45"></div>
    </div>
  )
}

export default Dropdown