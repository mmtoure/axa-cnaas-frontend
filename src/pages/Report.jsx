import React from 'react'
import Dashboard from '../components/Dashboard'
import InsuredFilter from '../components/InsuredFilter'

const Report = () => {
  return (
    <Dashboard activeMenu="Reports">
        <InsuredFilter />
    </Dashboard>
  )
}

export default Report