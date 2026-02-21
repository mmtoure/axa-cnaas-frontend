import React from 'react'
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sidebarData } from '../util/sidebarData';
import { selectCurrentUser } from '../features/auth/authSelectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { me } from '../features/user/userThunk';

const Sidebar = ({ activeMenu }) => {

    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(me())

    }, [dispatch]);

    if (!currentUser) return null;

  const filteredMenu = sidebarData.filter(item =>
    item.roles.some(role => currentUser.role.name.includes(role))
  );

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20'>
            {/** Sidebar menu items */}

            

            {filteredMenu.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`cursor-pointer w-full gap-4 text-[15px] py-3 px-6 flex items-center p-2 text-gray-700 rounded-lg ${activeMenu === item.label ? 'bg-purple-800 text-white' : ''}`}
                    onClick={() => navigate(item.path)}>
                    <item.icon className={`w-5 h-5 mr-3 text-purple-800 ${activeMenu === item.label ? 'text-white' : ''}`} />
                    <span>{item.label}</span>
                </button>
            ))}


        </div>
    )
}

export default Sidebar  