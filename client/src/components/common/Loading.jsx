
import { AnimatePresence, motion } from "framer-motion"
import { Skeleton } from "@mui/material"
const Loading = () => {
   
    
  return (
    <div>
        <AnimatePresence>
        <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="skeleton-wrapper"
  
    >
      <h2 className="section-title">
        <Skeleton type="title" />
      </h2>
     

      <ul className="flex flex-col gapy-4">
        {Array(9)
          .fill()
          .map((item, index) => (
            <li className="card w-[1200px] " key={index}>
              <Skeleton type="thumbnail" />
              <h4 className="card-title">
                <Skeleton type="title" />
              </h4>
              <p className="card-channel">
                <Skeleton type="text" />
              </p>
              <div className="card-metrics">
                <Skeleton type="half-text" />
              </div>
            </li>
          ))}
      </ul>
      {/* <Shimmer /> */}
    </motion.section>
      </AnimatePresence>
    </div>
   
  )
}

export default Loading