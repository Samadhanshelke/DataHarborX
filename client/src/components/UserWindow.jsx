import { VscChromeClose } from "react-icons/vsc";

const UserWindow = ({info,setBox}) => {
    console.log("info",info)
    const {UserName,Email,Phone}= info
    const close = ()=>{
        setBox(false)
    }
  return (
    <div className="flex relative flex-col gap-y-2 border rounded  bg-gray-700 w-[400px] h-[120px] text-white text-left ps-4 pt-3 pb-3">
        <span>Name: {UserName}</span>
        <span>Email: {Email}</span>
        <span>Phone: {Phone}</span>
      
       <VscChromeClose className="absolute right-2 font-extrabold text-2xl" onClick={()=>{close()}}/>
    </div>
  )
}

export default UserWindow