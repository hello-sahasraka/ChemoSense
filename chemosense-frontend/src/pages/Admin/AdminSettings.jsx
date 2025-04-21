import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminSettings = () => {
  return (
    <div className="w-full flex flex-col h-full">
        <div className="mb-8 w-full">
            <h2 className="text-[30px] font-bold">Settings</h2>
            <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>
        </div>
        
        <div className="w-full h-full">
            <div className='w-full h-auto relative'>
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[400px] absolute top-[67px]">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSettings