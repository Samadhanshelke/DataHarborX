import { useNavigate } from "react-router-dom"


const Hero = () => {
  const navigate = useNavigate();
  const gotoDashboard = ()=>{
      navigate('/dashboard')
  }
  return (
    <div className="flex flex-col items-center">
          <div  className="mt-12 flex gap-x-16 ">
          <div>
                <h1 className='text-5xl font-serif mb-2'> Seamlessly Manage, Organize,<br /> and Interact with User Data in <br /> Real-Time</h1>
                <p className="text-[18px] font-serif text-gray-600">Effortless CRUD Operations, Enhanced Filtering, and Offline Capabilities for Streamlined User Interaction</p>
          </div>
              <div>
                  <img src="../../public/Images/hero.jpg" alt="" className="h-[300px] w-[500px]"/>
          </div>
          </div>

          <div>
            <button className="bg-gray-800 text-white px-4 rounded cursor-pointer py-2 " onClick={gotoDashboard}>Dashboard</button>
          </div>

    </div>
  )
}

export default Hero