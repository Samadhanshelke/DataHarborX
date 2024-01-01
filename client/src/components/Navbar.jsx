
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Profile from '../components/Profile'
const Navbar = () => {
   const token = useSelector((state)=>state.auth.token)
  
  return (
    <div className='w-11/12 m-auto h-14 flex justify-between items-center'>
          <div>
             <span className='text-3xl font-semibold '>Data</span>
             <span className='text-2xl font-semibold tracking-wider  text-gray-800 ml-0.5'>HarborX</span>
          </div>
          <div className='hidden sm:flex gap-x-6 text-lg'>
             <Link to={"/"}>Home</Link>
            
            <Link to={"/dashboard"}>Dashboard</Link>
           
          </div>
          { token !== null
             ? <Profile/>
            :<div className='flex gap-x-6 text-lg'>
             <Link to="/login" className='bg-[#3559E0] text-white h-6 w-16 flex justify-center items-center px-4 py-4 text-center rounded hover:bg-[#38419D]'>Login</Link>
             <Link to="/signup">SignUp</Link>
             
          </div>
          }  
    </div>
  )
}

export default Navbar