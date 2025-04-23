import React from 'react'
import SubHeader from '../../components/Doctor/SubHeader'
import { motion } from "framer-motion"
import HeartRateChart from '../../components/Overview/HeartRateChart'
import BodyTemperatureChart from '../../components/Overview/BodyTemperatureChart'

const DocDetailsSinglePat = () => {
  return (
    <div>
      <SubHeader stype="Details" />
      <div>

        <div  className="max-w-7xl mx-auto py-6 lg:px-0">
          <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{opacity:0, y:20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1}}
          >
            <HeartRateChart />
            <BodyTemperatureChart />

          </motion.div>

        </div>
      </div>

    </div>
  )
}

export default DocDetailsSinglePat

// className="max-w-7xl mx-auto py-6 px-4 lg:px-25 border-2"