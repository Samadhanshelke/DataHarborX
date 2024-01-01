import { useEffect, useState } from "react"
import {deleteUser, getUserList } from "../services/userListAPI"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserWindow from "../components/UserWindow";
import Sort from "../components/Sort";
import { setUserList } from "../slices/userListingSlice";
import toast from "react-hot-toast";
// import { isHtmlElement } from "react-router-dom/dist/dom";

const DashBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [info,setInfo] = useState({})
    const [box,setBox] = useState(false)
    const userList = useSelector((state)=>state.userLists.userList)   
    const [search, setSearch] = useState(localStorage.getItem("searchterm"))
  
    useEffect(()=>{
    localStorage.setItem("searchterm",search)
    },[search])
    
    const handleSort = (option) => {
      // setSortOption(option.value);
      console.log(option)
      if(option.value === 'A-Z'){
            // console.log("A-Z SORT")
           
            const sortedList = [...userList].sort((a, b) => {
              const nameA = a.UserName.toUpperCase(); // Get UserName of object a and convert to uppercase
              const nameB = b.UserName.toUpperCase(); // Get UserName of object b and convert to uppercase
      
              if (nameA < nameB) {
                  return -1; // If nameA comes before nameB, return -1
              }
              if (nameA > nameB) {
                  return 1; // If nameA comes after nameB, return 1
              }
              return 0; // If names are equal
          });
          console.log("A-Z SORT",sortedList)
          dispatch(setUserList(sortedList))
          

      }
      if(option.value === 'Z-A'){
        console.log("Z-A SORT")
        const sortedList = [...userList].sort((a, b) => {
          const nameA = a.UserName.toUpperCase(); // Get UserName of object a and convert to uppercase
          const nameB = b.UserName.toUpperCase(); // Get UserName of object b and convert to uppercase
  
          if (nameA > nameB) {
              return -1; // If nameA comes before nameB, return -1
          }
          if (nameA < nameB) {
              return 1; // If nameA comes after nameB, return 1
          }
          return 0; // If names are equal
      });
      console.log("Z-A SORT",sortedList)
      dispatch(setUserList(sortedList))
     
  }

  if(option.value === 'Last Modified'){
    const sortedList = [...userList].sort((a, b) => {
      // Compare the 'updatedAt' timestamps of objects 'b' and 'a'
      return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  dispatch(setUserList(sortedList))
  }
  if(option.value === 'Last Inserted'){
    const sortedList = [...userList].sort((a, b) => {
      // Compare the 'createdAt' timestamps of objects 'b' and 'a'
      return new Date(b.createdAt) - new Date(a.createdAt);
  });
  dispatch(setUserList(sortedList))
  }
      
  };


    const handleDeleteUser = async (userId,navigate) => {
      try {
        
        await deleteUser(userId,navigate);
        dispatch(getUserList()); // Fetch updated user list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    

  
  useEffect(()=>{
   
    dispatch(getUserList())

  },[dispatch])

   

    const openWindow = (Email,Phone,UserName)=>{
      console.log("click",Email,Phone,UserName)
      setInfo({Email,Phone,UserName})
      setBox(!box) 
    }
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

    useEffect(() => {
  
      const handleOnline = () => setOnlineStatus(true);
      const handleOffline = () => setOnlineStatus(false);
  
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
  
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }, []);

    const handleSnackbar = () => {
      // Code to show a Snackbar or message to enable Wi-Fi / Mobile Data
      // This might involve triggering a notification component or displaying an alert.
      toast.error("Please enable Wi-Fi or mobile data to continue.")
      // alert("Please enable Wi-Fi or mobile data to continue.");
    };
    // const fetchData = () => {
    //   if (onlineStatus) {
    //     // Perform your API request here
    //     // For example: fetch('your_api_endpoint')
    //     console.log("Fetching data from API...");
    //   } else {
    //     handleSnackbar();
    //   }
    // };

    useEffect(()=>{
      const fetchData = () => {
        if (onlineStatus) {
          // Perform your API request here
          // For example: fetch('your_api_endpoint')
          console.log("Fetching data from API...");
        } else {
          handleSnackbar();
        }
      };
      fetchData()
    })

const handleNavigate = (user)=>{
  navigate(`/edituser/${user._id}`)
  localStorage.setItem("currentUser",JSON.stringify(user))

}
   
   
  return (
    <div className="w-11/12 flex flex-col items-center gap-y-4 justify-center m-auto mt-6">
        <div className="w-11/12 flex  justify-between items-center flex-wrap gap-y-2">
          <div><Sort handleSort={handleSort}/></div>
          <div>
             <input type="text" placeholder="search" className="border border-black rounded px-2 py-1 w-[250px]" value={search} onChange={(e)=>setSearch(e.target.value)}/>

          </div>
          
          <Link to={'/createUser'} className="border bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 text-white">Add User</Link>
          
        </div>
        {
          userList.length !== 0 ? (
            <table>
        <thead>

            <tr>
              <th className="border p-2 bg-gray-300 w-[400px]">Username</th>
              <th className="border p-2 bg-gray-300 w-[400px]">Email</th>
              <th className="border p-2 bg-gray-300 w-[400px]">Phone</th>
              <th className="border p-2 bg-gray-300 w-[400px]">Actions</th>
              
            </tr>
        </thead>
         <tbody>


              {
                userList.filter((user)=>{
                  return search.toLowerCase() ===''
                     ? user 
                     : user.UserName.toLowerCase().includes(search) || user.Email.toLowerCase().includes(search) ||user.Phone.includes(search) ;
                })
                 .map((user)=>{
                  const {Email,Phone,UserName} = user
                  return (
                    <tr key={user._id}>
                        <td className="border  p-2" onClick={()=>openWindow(Email,Phone,UserName)}>
                          <h1>{user.UserName}</h1>
                        </td>
                        <td className="border  p-2" onClick={()=>openWindow(Email,Phone,UserName)}>
                          <h1>{user.Email}</h1>
                        </td>
                        <td className="border  p-2" onClick={()=>openWindow(Email,Phone,UserName)}>
                          <h1>{user.Phone}</h1>
                        </td>
                        <td className="border  p-2 flex gap-x-4">
                          <button className="bg-slate-400 px-3 py-1 rounded text-white" onClick={()=> {handleNavigate(user)}}>edit</button>
                          <button className="bg-red-500 px-3 py-1 rounded text-white" onClick={()=> {handleDeleteUser(user._id,navigate)}}>Delete</button>
                        </td>

                    </tr>
                  )
                })
                
              }
         </tbody>
          
        </table>
          ): <h1 className="text-red-400 text-3xl">No data found</h1>
        }
        
          <div className="absolute top-[50%]">
          {
             box && <UserWindow info={info} setBox={setBox}/>
          }
          </div>

        
       
    </div>
  )
}

export default DashBoard