import { NavLink } from "react-router-dom"
import { menuConfig } from "../config/menu.config.js"
import { X } from "lucide-react"
import { Menu, LogOut } from "lucide-react"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/auth/authSelectors.js"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { me } from "../features/user/userThunk.js"

const Sidebar = ({ isOpen, setIsOpen }) => {
     const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

       useEffect(() => {
    
            dispatch(me())
    
        }, [dispatch]);
    
        if (!currentUser) return null;
    
      const filteredMenu = menuConfig.filter(item =>{
        return (
            item.roles?.some(role => currentUser?.role?.name.includes(role)) 
        )
        
      }
      )
      

      const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    
    return (
        <>
            {/* Overlay mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full bg-violet-950 text-white z-50 transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
        md:w-64`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5">
                    <div className={`md:block ${isOpen ? "block" : "hidden"}` }>
                        <h2 className={`text-xl font-bold`}>
                            FAGURU:v1.0                
                        </h2>
                          <span className="text-red-500 text-sm text-semibold">(test)</span>
                    </div>
                    <button
                        className="block md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
                <nav className="">
                    {filteredMenu.map((item, index) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center p-4 transition-all
                  ${isActive ? "bg-blue-700" : "hover:bg-blue-700"}
                  ${isOpen ? "justify-start" : "justify-center"}
                  md:justify-start`
                                }
                            >
                                <Icon size={22} />

                                <span
                                    className={`ml-4 whitespace-nowrap transition-all
                  ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
                  md:opacity-100 md:w-auto`}
                                >
                                    {item.label}
                                </span>
                            </NavLink>
                        )
                    })}
                </nav>
                <div className="absolute bottom-0 w-full">
                    <button
                        onClick={logout}
                        className={`flex items-center p-4 w-full transition-all
                  hover:bg-red-700
                  ${isOpen ? "justify-start" : "justify-center"} md:justify-start`}
                    >
                        <LogOut size={22} /> 
                        <span className={`ml-4 whitespace-nowrap transition-all
                  ${isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}
                  md:opacity-100 md:w-auto`}
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar