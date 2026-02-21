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


const Home = () => {
  const { data } = useSelector((state) => state.dashboard)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());

  }, [dispatch]);

  return (
    <div className='space-y-4'>

      <Dashboard activeMenu="Dashboard">

        <StatsGrid data={data} />
        <MonthlyInsuredChart insuredByMonth={data?.insuredByMonth} />
        <div className="p-2 space-y-4">
          <div className="w-full flex items-center justify-content gap-4">
            <TableRecentInsureds recentInsureds={data?.recentInsureds} />
            <TableRecentClaims recentClaims={data?.recentClaims} />
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home