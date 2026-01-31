import React,{useState} from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSelectors';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { me } from '../features/user/userThunk';
import Breadcrumb from './Breadcrumb';

const MenuBar = ({activeMenu}) => {
    const[openSideMenu, setOpenSideMenu] = useState(false);
    const[showDropdown, setShowDropdown] = useState(false);
    const dropDownRef = useRef(null);
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    }

     useEffect(() => {

      dispatch(me())
        
      }, [dispatch]);
    

    const handleLogout = () => {
      localStorage.clear();
      setShowDropdown(false);
      navigate('/login');
    }



  return (
    <div className='flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-4 sm:px-7 sticky top-0 z-30'>
        {/** Left side - Menu button and title */}

          <div className='flex items-center gap-5'>
           <button
             className='block lg:hidden text-black hover:bg-gray-100p-1 rounded transition-colors'
             onClick={() => setOpenSideMenu(!openSideMenu)}
            >
             {openSideMenu ? (
              <X className='text-2xl' />
              
              ):(
              <Menu className='text-2xl' />
              )}
            </button>
            <div className='flex items-center gap-2'>
              <span className='text-lg font-medium text-black trucate'> AXA  </span>

          
            </div>
          </div>
       
         
        {/** Rignt side - Avatar photo */}
        <div className='relative' ref={dropDownRef}>
          <button
            onClick={handleDropdownToggle}
            className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-800'>
            <User className='text-purple-700' />
          </button>

          {/** Dropdown menu */}

          {showDropdown && (
          
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden z-20 transition-all duration-300">
            {/** User info */}
            <div className='px-4 py-3 border-b border-gray-200'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100'>
                  <User className='text-purple-700 h-4 w-4' />
                  {console.log("CurrentUser", currentUser)
                  }
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {currentUser ? currentUser.fullName : 'Guest User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {currentUser ? currentUser.email : 'No Email'}
                  </p>
                </div>
              
              </div>
         
            </div>
            {/** Logout button */}
              <button
                  className='flex items-center gap-3 block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  onClick={handleLogout}
              >
                  <LogOut className='text-gray-700 h-4 w-4' /> 
                  Logout
              </button>


          </div> 
          )} 
        </div>
         

        {/** Mobile side menu button */}
        {openSideMenu && (
          <div className="fixed left-0 right-0 bg-white border-b border-gray-200 z-20 top-[73px] lg:hidden">
            {/** Mobile menu items */ }
            <Sidebar activeMenu={activeMenu} />
          </div>
        )}




    </div>
  )
  
}

export default MenuBar