import React from 'react'
import EmptyState from '../../../components/EmptyState'
import { useNavigate } from 'react-router-dom';
import ClaimsTimeline from '../../../components/ClaimsTimeline';
import ClaimsList from '../../../components/ClaimsList';


const ClaimsTab = ({currentInsured}) => {
  const claims = currentInsured?.claims || [];
  const navigate = useNavigate();

 
    if (!currentInsured) return null;

 
  return (
    <div>
      {currentInsured.claims && currentInsured.claims.length > 0 ? (
      <div className="bg-white rounded-lg shadow p-6 mt-6">
     {  console.log("CURRENT INSURED CLAIMS", claims)}

      <ClaimsList claims={claims} />
    </div>

      ):
        
        <EmptyState
          title="Aucun sinistre trouvé"
          description="Commencez par créer un sinistre."
          actionLabel="Créer un sinistre"
          onAction={() =>navigate(`/insureds/${currentInsured.id}/sinistres/new`)}  
        />
    }
    </div>
  )
}

export default ClaimsTab