import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend  } from "recharts";

const BodyTemperatureChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newPoint = {
        time: now.getMinutes(),
        temp: Math.floor(Math.random() * (40 - 33 + 1)) + 33, // simulate random data
      };

      setData(prevData => {
        const updatedData = [...prevData, newPoint];
        return updatedData.slice(-10); // keep only the latest 10 points
      });
    }, 5000); // update every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
    className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
    
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    >
        <h2 className="text-lg font-medium mb-4 text-gray-800">
        Body Temperature</h2>

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
                itemStyle={{color: "#F72C5B"}}
                cursor={{ stroke: 'gray', strokeWidth: 1 }}
                />
                <Legend />
                    <Line
                    type= 'linear'
                    dataKey= 'temp'
                    stroke= "#F72C5B"
                    strokeWidth= {3}
                    dot={{fill: "#F72C5B", strokeWidth: 2, r: 4}}
                    activeDot={{r: 6, strokeWidth: 2}}
                    />
            </LineChart>

        </ResponsiveContainer>
        </div>

    </motion.div>
  )
}

export default BodyTemperatureChart