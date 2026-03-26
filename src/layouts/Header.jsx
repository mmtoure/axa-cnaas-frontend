import { Menu } from "lucide-react"
import { assets } from "../assets/assets"
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSelectors";
import { useDispatch } from "react-redux";
import { me } from "../features/user/userThunk";
import { useRef } from "react";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
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
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 sticky top-0 z-30">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mb-2">
          <img src={assets.logo_axa} alt="AXA" className="h-10" />
          <div className="w-px h-10 bg-gray-700" />
          <img src={assets.logo_cnaas} alt="CNAAS" className="h-10" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Moustapha</span>

        <img
          src="https://i.pravatar.cc/40"
          className="w-8 h-8 rounded-full"
        />
         {/** Rignt side - Avatar photo */}
      <div className='relative' ref={dropDownRef}>
        <button
          onClick={handleDropdownToggle}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-800'>
          <User className='text-purple-700' />
        </button>

        {/** Dropdown menu */}

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden transition-all duration-300">
            {/** User info */}
            <div className='px-4 py-3 border-b border-gray-200'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gray-100'>
                  <User className='text-purple-700 h-4 w-4' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {currentUser ? currentUser.firstName + " " + currentUser.lastName : 'Guest User'}
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
      </div>
    </header>
  )
}

export default Header