import React from 'react'
import DocEdit from '../../components/DocEdit'
import PatEdit from '../../components/PatEdit'

const AdminEditSinglePat = () => {
  return (
    <div className='w-full h-auto relative'>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[450px] absolute top-[67px]">
        <PatEdit/>
        </div>
    </div>
  )
}

export default AdminEditSinglePat