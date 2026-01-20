import React from 'react'
import Dashboard from '../components/Dashboard'
import StatsGrid from '../components/StatsGrid'

const Home = () => {
 return (
    <div className='space-y-6'> 
      <div className='space-y-6'> 
        <Dashboard activeMenu="Dashboard">
          <StatsGrid />
        </Dashboard>
      </div>
    </div>
  )
}

export default Home