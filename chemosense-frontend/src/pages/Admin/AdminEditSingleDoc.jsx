import React from 'react'
import DocEdit from '../../components/DocEdit'

const AdminEditSingleDoc = () => {
  return (
    <div className='w-full h-auto relative'>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[400px] absolute top-[67px]">
        <DocEdit />

      </div>
    </div>
  )
}

export default AdminEditSingleDoc