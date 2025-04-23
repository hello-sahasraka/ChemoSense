import React from 'react'
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend  } from "recharts";

const BODY_TEMPERATURE_DATA = [
    { time: 0, temp: 36.7 },
    { time: 1, temp: 36.8 },
    { time: 2, temp: 36.9 },
    { time: 3, temp: 37.0 },
    { time: 4, temp: 37.2 },
    { time: 5, temp: 37.5 },
    { time: 6, temp: 37.6 },
    { time: 7, temp: 37.8 },
    { time: 8, temp: 38.0 },
    { time: 9, temp: 37.9 },
    { time: 10, temp: 37.6 }
  ];
  

const BodyTemperatureChart = () => {
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

            <LineChart data={BODY_TEMPERATURE_DATA}>
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