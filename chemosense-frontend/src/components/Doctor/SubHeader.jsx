import React from 'react'

const SubHeader = ({stype}) => {
  return (
    <div className="mb-8 w-full">
        <h2 className="text-[30px] font-bold">{stype}</h2>
        <p className="text-[12px] text-gray-700">We're thrilled to have you here!</p>
    </div>
  )
}

export default SubHeader