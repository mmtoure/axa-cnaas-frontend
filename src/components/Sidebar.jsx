import React from 'react'
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sidebarData } from '../util/sidebarData';

const Sidebar = ({activeMenu}) => {
    
    const navigate = useNavigate()
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20'>
        {/** Sidebar menu items */}
        
            {sidebarData.map((item,index) => (
                <button 
                    key={`menu_${index}`} 
                    className={`cursor-pointer w-full gap-4 text-[15px] py-3 px-6 flex items-center p-2 text-gray-700 rounded-lg ${activeMenu === item.label ? 'bg-purple-800 text-white' : ''}`}
                    onClick={() => navigate(item.path)}>
                        <item.icon className='w-5 h-5 mr-3' />
                        <span>{item.label}</span>
                </button>
            ))}
        

    </div>
  )
}

export default Sidebar  