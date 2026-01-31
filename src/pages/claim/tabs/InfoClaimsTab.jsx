import { CalendarCheck } from 'lucide-react'
import { ShieldCheck } from 'lucide-react'
import { IdCard } from 'lucide-react'
import React from 'react'
import { formatDate } from '../../../util/helper'

const InfoClaimsTab = ({claim}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="font-semibold text-gray-700 mb-4">
      Détails du sinistre
    </h3>

    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
      <div>
        <span className="text-gray-500">Assuré :</span>
        <p>{claim?.firstName} {claim?.lastName}</p>
      </div>

      
        <div>
          <span className="text-gray-500">Type :</span>
          <p>
            {claim?.sinisterType}
          </p>
        </div>
    

      {claim?.compensationAmount && (
        <div>
          <span className="text-gray-500">Montant :</span>
          <p className="font-semibold text-blue-700">
            {claim?.compensationAmount.toLocaleString()} CFA
          </p>
        </div>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
      <div>
        <span className="text-gray-500">Etat :</span>
        <p>{claim?.status}</p>
      </div>

      {claim?.hospitalizationStartDate && (
        <div>
          <span className="text-gray-500">Hospitalisation :</span>
          <p>
            {formatDate(claim?.hospitalizationStartDate)} → {formatDate(claim?.hospitalizationEndDate)}
          </p>
        </div>
      )}

      {claim?.compensationAmount && (
        <div>
          <span className="text-gray-500">Montant :</span>
          <p className="font-semibold text-blue-700">
            {claim?.compensationAmount.toLocaleString()} CFA
          </p>
        </div>
      )}
    </div>
  </div>
  )
}

export default InfoClaimsTab 