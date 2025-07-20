import SubHeader from '../../components/Doctor/SubHeader'
import { motion } from "framer-motion"
import HeartRateChart from '../../components/Overview/HeartRateChart'
import BodyTemperatureChart from '../../components/Overview/BodyTemperatureChart'
import Spo2LevelChart from '../../components/Overview/Spo2LevelChart'
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react'

const DocDetailsSinglePat = () => {
  const {nic} = useParams();
  const uid = nic;
  
  const [heartRate, setHeartRate] = useState(null);
  const [bodyTemp, setBodyTemp] = useState(null);
  const [spo2Level, setSpo2Level] = useState(null);


    useEffect(() => {
      const readingsRef = collection(db, "patients", uid, "predictions");
      const q = query(readingsRef, orderBy("timestamp", "desc"), limit(1));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Latest reading:", data);

          setHeartRate(data.heart_rate);
          setBodyTemp(data.body_temperature);
          setSpo2Level(data.oxygen_saturation);
        });
      });

      return () => unsubscribe();
    }, [uid]);

  return (
    <div>
      <SubHeader stype="Details" />
      <div className='h-[550px] overflow-y-scroll'>

        <div  className="max-w-7xl mx-auto py-6 lg:px-0">
          <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{opacity:0, y:20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1}}
          >
            <HeartRateChart heartRate={heartRate} />
            <BodyTemperatureChart bodyTemp={bodyTemp} />
            <Spo2LevelChart spo2Level={spo2Level} />

          </motion.div>

        </div>
      </div>

    </div>
  )
}

export default DocDetailsSinglePat

// className="max-w-7xl mx-auto py-6 px-4 lg:px-25 border-2"