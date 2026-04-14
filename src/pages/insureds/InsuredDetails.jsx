import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getInsuredById } from '../../features/insured/insuredThunk';

import {
  User,
  Users,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

import PersonalInfoTab from "./tabs/PersonalInfoTab";
import GuaranteesTab from "./tabs/GuaranteesTab";
import ClaimsTab from "./tabs/ClaimsTab";
import { useState } from 'react';
import { Phone } from 'lucide-react';

import { Book } from 'lucide-react';
import ContractTab from './tabs/ContractTab';
import StatusBadge from '../../components/StatusBadge';
import { LucideBadgeCheck } from 'lucide-react';
import InfoRow from '../../components/InfoRow';
import { PlusCircle } from 'lucide-react';
import { User2 } from 'lucide-react';
import { Calendar } from 'lucide-react';

const tabs = [
  { key: "info", label: "Infos personnelles", icon: User },
  { key: "contract", label: "Contrat", icon: Book },
  { key: "claims", label: "Sinistres", icon: AlertTriangle },
];

const InsuredDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const dispatch = useDispatch()
  const { currentInsured, loading, error } = useSelector((state) => state.insured);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInsuredById(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur</p>;
  if (!currentInsured) return null;
  return (

      <div className="p-2">
      <div className="bg-white p-4 rounded shadow">

        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <div className='mb-6'>
            <h2 className="text-2xl font-semibold">
              {currentInsured?.firstName} {currentInsured.lastName}
            </h2>
            <InfoRow
              icon={Phone}
              label="Téléphone"
              value={currentInsured?.phoneNumber}
            />
            <InfoRow
              icon={User2}
              label="Créé par"
              value={currentInsured?.createdBy?.firstName+" "+currentInsured?.createdBy?.lastName}
            />
            <InfoRow
              icon={Calendar}
              label="Créé le"
              value={new Date(currentInsured.createdAt).toLocaleDateString() }
            />
            <div className="flex justify-content gap-2 items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 mr-3">
                <LucideBadgeCheck className="w-4 h-4" />
                Statut:
              </div>
              <StatusBadge status={currentInsured?.status} />
            </div>
          </div>

          <div className='flex items-center gap-2 mb-3'>
            {/* Button Creation sinistre */}
            <button
              type="button"
              aria-label="Créer un nouvel assuré"
              onClick={() => navigate(`/insureds/${currentInsured.id}/sinistres/new`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                        hover:bg-blue-700 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Déclarer un sinistre
            </button>
            <button
              onClick={() => navigate("/insureds")}
              className="px-4 py-2 bg-gray-500 text-white rounded text-sm">
              Retour
            </button>
          </div>
        </div>
      </div>

       <div className="mt-3 mb-3 bg-white p-2 rounded shadow">

        {/* TABS */}
        <div className="flex gap-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition
                ${activeTab === key
                  ? "border-blue-600 text-blue-800"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
    </div>

       <div className="mb-4 bg-white p-4 rounded shadow">

        {/* CONTENT */}
        {activeTab === "info" && (
          <PersonalInfoTab insured={currentInsured} />
        )}
        {activeTab === "contract" && (
          <ContractTab contract={currentInsured?.contract} />
        )}
        {activeTab === "claims" && (
          <ClaimsTab currentInsured={currentInsured} />
        )}
      </div>
       </div>


  )
}
export default InsuredDetails