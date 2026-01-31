import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { Phone } from 'lucide-react';
import { getContractById } from '../../features/contract/contractThunk';
import { ListCheck } from 'lucide-react';
import { Users } from 'lucide-react';
import { FileText } from 'lucide-react';
import InfoRow from '../../components/InfoRow';
import InfoContractTab from './tabs/InfoContractTab';
import GarantiesTab from './tabs/GarantiesTab';
import { KeyIcon } from 'lucide-react';
import { IdCard } from 'lucide-react';
import { LucideBadgeCheck } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const tabs = [
  { key: "info", label: "Détails contrat", icon: ListCheck },
  { key: "garanties", label: "Garanties", icon: Users },
];
const ContractDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("info");
    const dispatch = useDispatch()
    const { contract, loading, error } = useSelector((state) => state.contract);
    const navigate = useNavigate();

     useEffect(() => {    
            dispatch(getContractById(id));
        }, [dispatch, id]);

    if (loading) return <p className="p-6">Chargement...</p>;
    if (error) return <p className="p-6 text-red-600">Erreur</p>;
    if (!contract) return null;
    return (
      <Dashboard activeMenu="Contrats">
      <div className="bg-white p-6 rounded shadow">
          {/* HEADER */}
          <div className="flex items-center justify-between">
              <div className='mb-6'>
                  <h2 className="text-2xl font-semibold">
                      {contract.firstName} {contract.lastName}
                  </h2>
                  <InfoRow
                    icon={IdCard}
                    label="N° police"
                    value={contract.policeNumber}
                  />
                  <div className="flex justify-content gap-2 items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mr-3">
                    <LucideBadgeCheck className="w-4 h-4" />
                    Statut: 
                  </div>
                  <StatusBadge status={contract?.status} />
                  
                </div>
              </div>
              <button
                  onClick={() => navigate("/contracts")}
                  className="px-4 py-2 bg-gray-500 text-white rounded text-sm">
                  Retour
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
          <InfoContractTab contract={contract} />
          )}
          {activeTab === "garanties" && (
          <GarantiesTab garanties={contract?.garanties} />
          )}
       
    
      </div>
      </Dashboard>
    
    )
}

export default ContractDetails