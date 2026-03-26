import React from 'react'
import Dashboard from '../../components/Dashboard'
import { Folders } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getclaimById, rejectClaim, validateClaim } from '../../features/claim/claimThunk';
import InfoClaimsTab from './tabs/InfoClaimsTab';
import DocumentsClaimsTab from './tabs/DocumentsClaimsTab';
import { Clock } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { LucideBadgeCheck } from 'lucide-react';
import ClaimHeader from '../../components/ClaimHeader';
import ClaimSteps from '../../components/ClaimSteps';
import StatusBar from '../../components/StatusBar';


const tabs = [
  { key: "info", label: "Info. Sinistre", icon: ListCheck },
  { key: "documents", label: "Documents", icon: Folders },
  { key: "historiques", label: "Historiques", icon: Clock },

];
const ClaimDetails = () => {
  const {id}= useParams();
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch();
  const {currentClaim, loading, success, error} = useSelector((state) => state.claim);

  useEffect(()=>{

    dispatch(getclaimById(id))
    

  }, [dispatch, id])

  const handleValidateClaim = (claimId) => () => {
    dispatch(validateClaim(claimId))
  }

  const handleRejectClaim = (claimId) => () => {
    dispatch(rejectClaim(claimId))
  } 

  return (
 
    <div className="bg-white p-6 rounded shadow">
     {/** HEADER */}
        <div className='mb-6'>
          <ClaimHeader claim={currentClaim} />
        </div>

      {/** STEPS */}
      <div className='mb-6 w-1/2'>
       <StatusBar status={currentClaim?.status} />
      </div>
      {/** ACTION BUTTONS */}
      <div className="mb-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleValidateClaim(id)}
        >
          Valider
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={handleRejectClaim(currentClaim?.id)}>
          Rejeter
        </button>
      </div>

     {/* TABS */}
          <div className="flex gap-2 border-b mb-6">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition
                  ${
                    activeTab === key
                      ? "border-blue-600 text-blue-800"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          
          {/* CONTENT */}
          {activeTab === "info" && (
          <InfoClaimsTab claim={currentClaim} />
          )}
          {activeTab === "documents" && (
          <DocumentsClaimsTab documents={currentClaim?.claimDocuments} />
          )}
       
    
      </div>
   
  )
}

export default ClaimDetails