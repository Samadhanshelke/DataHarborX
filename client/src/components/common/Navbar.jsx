
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Profile from './Profile'
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
const Navbar = () => {
   const token = useSelector((state)=>state.auth.token)
   const theme = useTheme();
  return (
   <div className='bg-black navbar'>
         <div className='w-11/12 m-auto h-14 flex justify-between items-center'>
               <div>
                  {/* <span className='text-3xl font-semibold '>Data</span> */}
                  <span className='text-2xl font-semibold tracking-wider  text-white ml-0.5'>DataHarborX</span>
               </div>
               <div className='hidden sm:flex gap-x-6 text-lg'>
                  <Link to={"/"} >
                  <Button size="large"  style={{ color: theme.palette.primary.white }}>Home</Button>
                  </Link>
                  <Link to={"/Dashboard"} >
                  <Button size="large"  style={{ color: theme.palette.primary.white }}>DashBoard</Button>
                  </Link>
                  
                  <Link to={"/about"} >
                  <Button size="large"  style={{ color: theme.palette.primary.white }}>About</Button>
                  </Link>
                  
               </div>
               { token !== null
                  ? <Profile/>
                  :<div className='flex gap-x-6 text-lg'>
                  <Link to="/login">
                  <Button variant="contained">Login</Button>

                  </Link>
                  <Link to="/signup">
                     <Button variant="outlined" size="medium">Signup </Button>
                  </Link>

                  
               </div>
               }  
         </div>
   </div>
  )
}

export default Navbar