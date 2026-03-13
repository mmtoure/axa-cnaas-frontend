import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllContracts } from '../../features/contract/contractThunk'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import Table from '../../components/Table'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { getAllclaims } from '../../features/claim/claimThunk'
import EmptyState from '../../components/EmptyState'
import ClaimsList from '../../components/ClaimsList'

const columns = [
  {
    header: "Numero Sinistre",
    accessor: "numeroSinistre",
    className: "text-left px-4 py-2 font-medium",
  },
  {
    header: "Type de sinistre",
    accessor: "sinisterType",
    className: "text-left px-4",
  },


  {
    header: "status",
    accessor: "status",
    className: "text-left px-4 py-2 font-medium",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center px-4 py-2 font-medium",
  },
];

const ClaimsListPage = () => {
     
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {claims} = useSelector((state) => state.claim);

   
   console.log(claims);
   

    useEffect(()=>{
        dispatch(getAllclaims())
    },[dispatch])

  


  return (
    <Dashboard activeMenu="Sinistres">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
        

          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des Sinistres
            </h3>
            
          </div>

          {/* Liste des groups */}
            <div className='card p-4'>
              {/* Table des sinistres */}
              
              
              {claims && claims.length > 0 ? (
                <ClaimsList claims={claims} />

              ) :
              (
                <EmptyState
                  title="Aucun Sinistre trouvé"
                  description="Commencez par créer un sinistre."
                />

              )}


            </div>
          </div>
       

    </Dashboard>
  )
}

export default  ClaimsListPage;
