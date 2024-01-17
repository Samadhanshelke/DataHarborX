import Hero from "../components/Homepage/Hero"
import Hero2 from "../components/Homepage/Hero2"




const HomePage = () => {
  return (
   <div className='w-11/12 m-auto flex flex-col justify-center items-start mt-4 sm:mt-20 '>
        <Hero/>
        <Hero2/>
       
   </div>
  )
}

export default HomePage