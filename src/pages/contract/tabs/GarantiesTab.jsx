import React from 'react'
import GarantieCard from '../../../components/GarantieCard'

const GarantiesTab = ({garanties}) => {
  return (
    <div>
        {garanties && garanties.length > 0 ? (
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {garanties.map((garantie) => (
                <GarantieCard key={garantie.id} g={garantie} />
            ))}
        </div>

          ) : (
            <p>Aucune garantie disponible.</p>
          )}
    </div>
  )
}

export default GarantiesTab