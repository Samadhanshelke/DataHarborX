import hero2 from '../../Assets/Images/hero.svg'
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
const Hero2 = () => {
  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      // You can adjust the threshold value based on when you want the animation to start
      const threshold = window.innerHeight / 4;
      const element = document.getElementById("left_side"); // Replace with the actual ID of your div

      if (element && window.scrollY + threshold > element.offsetTop) {
        controls.start({
          x: 0,
          opacity: 1,
          transition: { duration: 1 },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);
  return (
    <div className='flex justify-between items-center m-auto gap-x-3 w-11/12 overflow-hidden'>
        <motion.div
         initial={{ x: -200, opacity: 0 }}
         
          animate={controls}>
            <img
            
              id="left_side"
            src={hero2} alt="leftimage" className="h-[340px] w-[520px]"
            />

        </motion.div>

        <motion.div className='w-[800px]'
           initial={{ x: 200, opacity: 0 }}
           animate={controls}
        >
          <h1 className='text-4xl'>UserManager: Secure User Data Management</h1>
          <span className='text-gray-500'>
                 UserManager provides secure user data management with a decentralized blockchain, 
                ensuring instant global payments with low transaction fees. It eliminates the need for
                manual data entry and strives for efficient user data management.
           </span>
        </motion.div>
    </div>
  )
}

export default Hero2