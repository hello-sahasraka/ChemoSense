import React from 'react'
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend  } from "recharts";

const HEART_RATE_DATA = [
    { time: 0, bpm: 78 },
    { time: 1, bpm: 80 },
    { time: 2, bpm: 79 },
    { time: 3, bpm: 81 },
    { time: 4, bpm: 83 },
    { time: 5, bpm: 85 },
    { time: 6, bpm: 84 },
    { time: 7, bpm: 82 },
    { time: 8, bpm: 81 },
    { time: 9, bpm: 80 },
    { time: 10, bpm: 79 },
    { time: 11, bpm: 78 },
    { time: 12, bpm: 80 },
  ];
  

const HeartRateChart = () => {
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

                <LineChart data={HEART_RATE_DATA}>
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