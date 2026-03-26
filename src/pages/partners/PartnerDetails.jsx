import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { Phone } from 'lucide-react'
import { getPartnerById } from '../../features/partner/partnerThunk'
import InfoRow from '../../components/InfoRow'
import { PlusCircle } from 'lucide-react'
import PricingsList from '../../components/PricinsList'

const PartnerDetails = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
        //const {pricings} = useSelector((state)=>state.pricing)
        const {partner} = useSelector((state)=>state.partner)
        console.log(partner);
      useEffect(()=>{
        dispatch(getPartnerById(id))

      },[dispatch,id])
        

  return (
  
        <div className="bg-white p-6 rounded shadow">
          {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className='mb-6'>
                  <h2 className="text-2xl font-semibold">
                      {partner?.name} 
                  </h2>
                  <InfoRow
                    icon={UserPlus}
                    label="Adresse email: "
                    value={partner?.email}
                  />
                  <InfoRow
                    icon={Phone}
                    label="Téléphone: "
                    value={partner?.phoneNumber}
                  />            
              </div>
              <div className='flex items-center justify-content gap-2'>
              <button
                type="button"
                aria-label="Créer un nouvel assuré"
                onClick={() => navigate(`/partners/${id}/pricings/create`)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                        hover:bg-blue-700 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-400">
                <PlusCircle className="w-5 h-5" />
                New pricing
              </button>
                <button
                    onClick={() => navigate("/partners")}
                    className="px-4 py-2 bg-gray-500 text-white rounded text-sm">
                    Retour
                </button>
              </div>
           </div>

          {/* Liste des groups */}
           
              {/* Table des sinistres */}
              {console.log(partner?.pricings?.length)}
              
                <PricingsList pricings={partner?.pricings} />


            </div>
        

  )
}

export default PartnerDetails