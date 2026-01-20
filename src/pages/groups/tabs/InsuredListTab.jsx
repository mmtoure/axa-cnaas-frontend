import React from 'react'
import InsuredList from '../../insureds/InsuredList'

const InsuredListTab = ({insureds}) => {
  return (
    <div>
       {/* Table */}
    <InsuredList insuredsData={insureds} />
    </div>
  )
}

export default InsuredListTab