import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend  } from "recharts";

const HeartRateChart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newPoint = {
        time: now.getSeconds(), 
        bpm: Math.floor(Math.random() * (90 - 75 + 1)) + 75, // simulate random data
      };

      setData(prevData => {
        const updatedData = [...prevData, newPoint];
        return updatedData.slice(-10); // keep only the latest 10 points
      });
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <motion.div
    className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
    
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    >
        <h2 className="text-lg font-medium mb-4 text-gray-800">
        Heart Rate</h2>

            <div className="h-80">
            <ResponsiveContainer width={"100%"} height={"100%"}>

                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey={"time"} stroke="#9CA3AF" interval={0} />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                    // labelStyle={{ color: '#E5E7EB' }}
                    contentStyle={{
                        backgroundColor: "rgba(241, 239, 236, 0.9",
                        borderColor: "#C0C0C0"
                    }}
                    itemStyle={{color: "#6366F1"}}
                    cursor={{ stroke: 'gray', strokeWidth: 1 }}
                    />
                    <Legend />
                        <Line
                        type= 'linear'
                        dataKey= 'bpm'
                        stroke= "#6366F1"
                        strokeWidth= {3}
                        dot={{fill: "#6366F1", strokeWidth: 2, r: 4}}
                        activeDot={{r: 6, strokeWidth: 2}}
                        />
                </LineChart>

            </ResponsiveContainer>

            </div>

    </motion.div>
  )
}

export default HeartRateChart