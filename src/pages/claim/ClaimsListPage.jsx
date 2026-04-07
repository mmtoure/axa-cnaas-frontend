import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllclaims } from '../../features/claim/claimThunk'
import EmptyState from '../../components/EmptyState'
import ClaimsList from '../../components/ClaimsList'


const ClaimsListPage = () => {
     
    const dispatch = useDispatch()
    const {claims} = useSelector((state) => state.claim);
    useEffect(()=>{
        dispatch(getAllclaims())
    },[dispatch])

  return (
   
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
      
  )
}

export default  ClaimsListPage;
