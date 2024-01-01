import { MdOutlineArrowDropDown,MdPerson } from "react-icons/md";
import Dropdown from "./Dropdown";
import { useEffect, useRef, useState } from "react";

const Profile = () => {
    const [openDropdown,setOpendropdown] = useState(false);
    const handleOpenDropdown=()=>{
         setOpendropdown(!openDropdown)
    }

    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpendropdown(false); // Close the sidebar if clicked outside
          }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);
  return (
    <div className="relative" ref={dropdownRef} >
         
         <span className="text-2xl flex justify-start items-center border-2 border-gray-200 cursor-pointer rounded" onClick={handleOpenDropdown}>
            <MdPerson/>
            <MdOutlineArrowDropDown/> 
            
         </span>
         <div className="absolute top-10 left-[-70px]  sm:top-10 sm:left-[-26px] md:left-[-90px] lg:left-[-60px]">
             {
                openDropdown ? <Dropdown openDropdown={openDropdown} setOpendropdown={setOpendropdown}/> : null
             }
                
            </div>
    </div>
  )
}

export default Profile