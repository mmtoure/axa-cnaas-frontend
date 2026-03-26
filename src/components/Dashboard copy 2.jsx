import MenuBar from "./MenuBar"
import Sidebar from "./Sidebar"
import Breadcrumb from "./Breadcrumb";


const Dashboard = ({children,activeMenu}) => {
 
 

  return (
    <div>
      <MenuBar activeMenu={activeMenu} />
    
      <div className='flex'>

        <div className="max-[1080px]:hidden">
          {/** Sidebar content */}
          <Sidebar activeMenu={activeMenu} />
        </div>

        <div className='grow max-5 p-2 bg-gradient-to-br from-slate-50 via-blue-50 
                        to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500'>
          <div className="p-2 mb-2">
              <Breadcrumb />
            </div>
        {children}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard