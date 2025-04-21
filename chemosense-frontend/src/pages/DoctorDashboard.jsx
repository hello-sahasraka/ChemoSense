import React from 'react'
import Navbar from '../components/Navbar'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from 'react-router-dom'
import Docnavbar from '../components/Doctor/Docnavbar'
import DocHeader from '../components/Doctor/DocHeader'
import SubHeader from '../components/Doctor/SubHeader'

const DoctorDashboard = () => {
  return (
    <div>
        <Docnavbar />
        <DocHeader />
        <div className='bg-[#ECECEC] absolute right-0 top-[65px] flex justify-center' style={{ width: "calc(100% - 250px)", height: 'calc(100% - 65px)' }}>
          <div className='w-5/6 h-full flex flex-col'>
            <div className="w-full h-full">
              <Outlet />
            </div>
          </div>
        </div>
    </div>
  )
}

export default DoctorDashboard