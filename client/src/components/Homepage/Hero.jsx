import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"
import hero from '../../Assets/Images/hero2.svg'
import { motion } from "framer-motion";
const Hero = () => {
  const navigate = useNavigate();
  const gotoDashboard = ()=>{
      navigate('/dashboard')
  }
  return (
    <div className="flex flex-col items-center">
          <div  className="w-full overflow-hidden mt-2 sm:mt-12 flex flex-col gap-x-16 sm:flex-row">
          <motion.div 
             initial={{ x: -100, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ duration: 1 }}
          >
                <h1 className='text-3xl sm:text-5xl font-serif mb-2'> Seamlessly Manage, Organize,<br /> and Interact with User Data in <br /> Real-Time</h1>
                <p className="text-[16px] font-serif text-gray-500">Effortless CRUD Operations, Enhanced Filtering, and Offline Capabilities for Streamlined User Interaction</p>
          </motion.div>
              <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
        >
                  <img src={hero} alt="" className="h-[340px] w-[520px]"/>
              </motion.div>
          </div>

          <motion.div
           initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="mt-6 mb-4"
           >
           
                <Button onClick={gotoDashboard} size="md"  variant="contained">Dashboard</Button>
           
          </motion.div>

    </div>
  )
}

export default Hero