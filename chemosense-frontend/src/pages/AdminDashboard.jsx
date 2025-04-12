import React from 'react'
import Navbar from '../components/Navbar'
import AdminHeader from '../components/AdminHeader'
import DoAdmin1 from './DoAdmin1'
import DoAdmin2 from './DoAdmin2'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div>
        <Navbar />
        <AdminHeader />
        <div className='bg-[#ECECEC] absolute right-0 top-[65px] flex justify-center' style={{ width: "calc(100% - 250px)", height: 'calc(100% - 65px)' }}>
          <div className='w-5/6 h-auto'>
          <Outlet />
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard