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
          {currentUser?.partnerName === "LG" && <img src={assets.logo_lg} alt="LG" className="h-10" />}
          {currentUser?.partnerName === "CNAAS" && <img src={assets.logo_cnaas} alt="CNAAS" className="h-10" />}
        </div>
      </div>
       

      {/* Right */}
      <div className="flex items-center justify-end gap-3 sm:gap-4">

        {/* Nom utilisateur (hidden sur petit écran) */}
        <span className="hidden sm:block text-sm text-gray-600 truncate max-w-[120px] md:max-w-none">
          {currentUser?.firstName + " " + currentUser?.lastName}
        </span>

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropDownRef}>

          <button
            onClick={handleDropdownToggle}
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 
      transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-800"
          >
          <User />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">

                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <User className="text-purple-700 h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {currentUser
                        ? currentUser.firstName + " " + currentUser.lastName
                        : "Guest User"}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {currentUser?.email || "No Email"}
                    </p>
                  </div>

                </div>
              </div>

              {/* Actions */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <LogOut className="h-4 w-4" />
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