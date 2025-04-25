import React from 'react'
import DocPatDropDown from '../../components/DocPatDropDown';
import { Outlet } from 'react-router-dom';
const AdminEdit = () => {
  return (
    <div className="w-full flex flex-col h-full">
        <div className="mb-8 w-full">
            <h2 className="text-[30px] font-bold">Information</h2>
            <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>
        </div>

        <div className='absolute left-[35%] top-[14.5%] z-10'>
          <DocPatDropDown />
        </div>
        
        
        <div className="w-full h-full">
          <Outlet />
        </div>
    </div>
  )
}

export default AdminEdit