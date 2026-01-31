import React from 'react'
import InsuredList from '../../../components/InsuredList'


const InsuredListTab = ({insureds}) => {
  return (
    <div>
      { console.log("insureds", insureds)
      }
      
       {/* Table */}
    <InsuredList insuredsData={insureds} />
    </div>
  )
}

export default InsuredListTab