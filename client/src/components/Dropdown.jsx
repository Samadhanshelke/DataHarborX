import { IoIosLogOut } from "react-icons/io";
import { FaPaintBrush } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {logout} from '../services/authAPI'
const Dropdown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutUser = ()=>{
        
       dispatch(logout(navigate))
    }
  return (
    <div className="bg-gray-600 text-white p-4 rounded-md flex flex-col gap-y-2 relative">
     <div className="flex items-center gap-x-1 cursor-pointer">
         <FaPaintBrush className="text-red-300"/>
         <span>Manage</span>
      </div>
      <div className="flex items-center gap-x-1 cursor-pointer" onClick={logoutUser}>
         <IoIosLogOut className="text-red-300"/>
         <span>Logout</span>
      </div>
     
      <div className="absolute w-4 top-[-8px] left-[50%] h-4 bg-gray-600 rotate-45"></div>
    </div>
  )
}

export default Dropdown