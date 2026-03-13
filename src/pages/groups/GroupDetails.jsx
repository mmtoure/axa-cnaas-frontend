import { FileText } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroupById } from '../../features/group/groupThunk';
import { Phone } from 'lucide-react';
import InfoRow from '../../components/InfoRow';
import InsuredListTab from './tabs/InsuredListTab';
import ContractTab from './tabs/ContractTab';
import { Users } from 'lucide-react';
import Dashboard from '../../components/Dashboard';
import { UserPlus } from 'lucide-react';
import { Users2 } from 'lucide-react';
import { Calendar } from 'lucide-react';


const tabs = [
  { key: "insureds", label: "Liste des assurés", icon: Users },
  { key: "contract", label: "Contrat", icon: FileText },
];
const GroupDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("insureds");
    const dispatch = useDispatch()
    const { group, loading, error } = useSelector((state) => state.group);
    const navigate = useNavigate();

    

     useEffect(() => {    
            dispatch(getGroupById(id));
        }, [dispatch, id]);

    if (loading) return <p className="p-6">Chargement...</p>;
    if (error) return <p className="p-6 text-red-600">Erreur</p>;
    if (!group) return null;
    return (
      <Dashboard activeMenu="Groupements">
      <div className="bg-white p-6 rounded shadow">
          {/* HEADER */}
          <div className="flex items-center justify-between">
              <div className='mb-6'>
                  <h2 className="text-2xl font-semibold">
                      {group.name} 
                  </h2>
                  <InfoRow
                    icon={UserPlus}
                    label="Représentant"
                    value={group.firstName+" "+group.lastName}
                  />
                  <InfoRow
                    icon={Phone}
                    label="Téléphone"
                    value={group.phoneNumber}
                  />
                   <InfoRow
                    icon={UserPlus}
                    label="Créé par"
                    value={group.user.firstName+" "+group.user.lastName}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Créé le"
                    value={new Date(group.createdAt).toLocaleDateString() }
                  />
                  <InfoRow
                    icon={Users2}
                    label="Nombre d'assurés"
                    value={group.insureds?.length || 0}
                  />  
              </div>
              <button
                  onClick={() => navigate("/groups")}
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
                className={`flex items-center gap-2 px-4 py-2 text-md font-medium border-b-2 transition
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
          {activeTab === "insureds" && (
          <InsuredListTab insureds={group?.insureds} />
          )}
          {activeTab === "contract" && (
          <ContractTab group={group} />
          )}
    
      </div>
      </Dashboard>
    
    )
}

export default GroupDetails