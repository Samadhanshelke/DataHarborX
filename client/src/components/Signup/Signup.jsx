import { SignupForm } from "./SignupForm"
const Signup = () => {
  return (
     <div className="flex items-center flex-col justify-center w-full h-screen  max-h-[calc(100vh-56px)] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ">
          <div className="w-[900px] m-auto flex-col  flex justify-center rounded-lg p-2 items-center bg-white">
               
                <div className="flex flex-col w-full justify-start ps-4 py-2 ">
                    <h1 className="text-2xl font-semibold ">Personal Information</h1>
                    <span className="text-[14px] text-gray-400">Enter your Details</span>
                </div>
                <SignupForm/>
          </div>

     </div>

  )
}

export default Signup






 {/* <div className="flex justify-center items-center m-auto w-full">
                    <img src="/Images/signup.jpg" alt="no" className='h-[100px] w-[150px]'/>
                </div> */}