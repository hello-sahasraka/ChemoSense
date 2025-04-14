import React, { useState } from 'react'
// import TableList from '../../components/TableList'
import { IoSearch, IoPersonCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DATA_LIST = [
    {"name": "Dr. John Doe","doctor_id": "0001","mbbs_no": "MBBS/SL/2021/001","contact_no": "+94 711167153"},
    {"name": "Dr. Jane Smith","doctor_id": "0002","mbbs_no": "MBBS/SL/2021/002","contact_no": "+94 711167154"},
    {"name": "Dr. Alan Brown","doctor_id": "0003","mbbs_no": "MBBS/SL/2021/003","contact_no": "+94 711167155"},
    {"name": "Dr. Emily Clark","doctor_id": "0004","mbbs_no": "MBBS/SL/2021/004","contact_no": "+94 711167156"},
    {"name": "Dr. Michael Lee","doctor_id": "0005","mbbs_no": "MBBS/SL/2021/005","contact_no": "+94 711167157"},
    {"name": "Dr. Sarah Kim","doctor_id": "0006","mbbs_no": "MBBS/SL/2021/006","contact_no": "+94 711167158"},
    {"name": "Dr. David Silva","doctor_id": "0007","mbbs_no": "MBBS/SL/2021/007","contact_no": "+94 711167159"},
    {"name": "Dr. Nimal Perera","doctor_id": "0008","mbbs_no": "MBBS/SL/2021/008","contact_no": "+94 711167160"},
    {"name": "Dr. Chamari Fernando","doctor_id": "0009","mbbs_no": "MBBS/SL/2021/009","contact_no": "+94 711167161"},
    {"name": "Dr. Tharindu Jayasinghe","doctor_id": "0010","mbbs_no": "MBBS/SL/2021/010","contact_no": "+94 711167162"} ]

const AdminEditDoctor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(DATA_LIST);
  const navigate = useNavigate();


  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = DATA_LIST.filter(data=> data.name.toLowerCase().includes(term) || data.doctor_id.toLowerCase().includes(term));
    setFilteredData(filtered);
  };

  const handleEdit = (doctorid) => {
    console.log(doctorid);
    
    navigate(`/admin/edit/doctorlist/${doctorid}`);
  };

  const handleDelete = (index) => {
    del(index);
  }

  return (
    <div className='w-full h-auto relative'>
            <div className="w-full flex justify-end">
                <div className="w-2/5 h-[40px] relative rounded-full flex shadow-[0_0_5px_rgba(0,0,0,0.20)] mb-8">
                    <input 
                        className='h-full w-full bg-white rounded-full placeholder:text-xs pl-3 pr-15 focus:outline-none focus:ring-2 focus:ring-blue-400' 
                        type="text" 
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch} />
                    <div className='h-full aspect-square bg-[#1330BE] text-white border-none px-5 py-2 text-xs font-bold rounded-full absolute right-0 flex justify-center items-center'>
                        <IoSearch size={20} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg w-full h-[450px] absolute top-[67px]">
              <div className="overflow-y-auto w-full h-full">
                <table className="min-w-full divide-y divide-gray-900">
                  <thead className='sticky top-0 z-10 bg-white'>
                      <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Doctor ID</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">MBBS No</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">Contact No</th>
                          <th></th>
                          {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">E-mail</th> */}
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-400">
                      {filteredData.map((data, index) => (
                        <motion.tr key={index}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration: 0.3}}
                        >
                          <td className='px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-500 flex gap-2 items-center'>
                                    <IoPersonCircleOutline size={30} />
                                    {data.name}
                          </td>
                          <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500'>#{data.doctor_id}</td>
                          <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500'>{data.mbbs_no}</td>
                          <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500'>{data.contact_no}</td>
                          <td className='px-6 py-3 whitespace-nowrap'>
                            <button className='text-indigo-600 hover:text-indigo-400 mr-2 cursor-pointer'
                            onClick={() => handleEdit(data.doctor_id)}
                            ><BiSolidEdit size={18} /></button>

                            <button className='text-red-600 hover:text-red-400 cursor-pointer'
                            onClick={handleDelete}
                            ><RiDeleteBin6Line size={18} /></button>
                          </td>
                          
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
  )
}

export default AdminEditDoctor

//<TableList col_1={"Name"} col_2={"ID"} col_3={"MBBS No"} col_4={"Contact No"} data={DOC_LIST} />