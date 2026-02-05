import React from 'react'
import GarantieCard from '../../../components/GarantieCard'

const GarantiesTab = ({contract}) => {
  return (
    <div>
        {contract ? (
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GarantieCard key={contract.id} g={contract} />
        </div>

          ) : (
            <p>Aucune garantie disponible.</p>
          )}
    </div>
  )
}

export default GarantiesTab