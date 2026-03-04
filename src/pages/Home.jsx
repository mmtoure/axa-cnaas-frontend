import React from 'react'
import Dashboard from '../components/Dashboard'
import StatsGrid from '../components/StatsGrid'
import MonthlyInsuredChart from '../components/MonthlyInsuredChart'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getData } from '../features/dashboard/dashboardThunk'
import TableSection from '../components/TableRecentClaims'
import TableRecentClaims from '../components/TableRecentClaims'
import TableRecentInsureds from '../components/TableRecentInsureds'
import { Users } from 'lucide-react'
import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.dashboard)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());

  }, [dispatch]);

  return (
    <div className='space-y-4'>

      <Dashboard activeMenu="Dashboard">

        <div className="p-2 space-y-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-500">
            Bienvenue sur votre tableau de bord AXA/CNAAS 
          </h1>
          {/* Center - Action buttons with gradient hover */}
  <div className="flex items-center gap-4">
    <button
      onClick={() => navigate("/insureds/create")}
      className="px-5 py-3 bg-gradient-to-r from-blue-900 to-purple-700 text-white rounded-md shadow-md
                 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300
                 flex items-center gap-2">
      <UserPlus className="h-5 w-5 animate-bounce" />
      Subscription individuelle
    </button>

    <button
  onClick={() => navigate("/groups/create")}
  className="px-5 py-3 bg-green-600 text-white rounded-lg shadow-md border border-gray-200
             hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400
             transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
  <Users className="h-5 w-5 animate-pulse" />
  Subscription collective
</button>
  </div>
        </div>

        <StatsGrid data={data} />
      
        <div className="p-2 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className='lg:col-span-2'>
            <MonthlyInsuredChart insuredByMonth={data?.insuredByMonth} />
            </div>
            <div className='lg:col-span-1 gap-2 flex flex-col'>
              <TableRecentInsureds recentInsureds={data?.recentInsureds} />
              <TableRecentClaims recentClaims={data?.recentClaims} />
            </div>
          </div>
        </div>
      
      </Dashboard>
    </div>
  )
}

export default Home