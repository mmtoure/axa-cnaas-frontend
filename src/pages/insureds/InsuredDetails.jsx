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
import BeneficiaryTab from "./tabs/ContractTab";
import GuaranteesTab from "./tabs/GuaranteesTab";
import ClaimsTab from "./tabs/ClaimsTab";
import { useState } from 'react';
import { Phone } from 'lucide-react';

import { Book } from 'lucide-react';
import ContractTab from './tabs/ContractTab';
import StatusBadge from '../../components/StatusBadge';
import { LucideBadgeCheck } from 'lucide-react';
import InfoRow from '../../components/InfoRow';

const tabs = [
  { key: "info", label: "Infos personnelles", icon: User },
  { key: "contract", label: "Contrat", icon: Book },
  { key: "guarantees", label: "Garanties", icon: ShieldCheck },
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
    <Dashboard activeMenu="Assurés">
      <div className="bg-white p-6 rounded shadow">

        {/* HEADER */}
        <div className="flex items-center justify-between">
            <div className='mb-6'>
                <h2 className="text-2xl font-semibold">
                    {currentInsured.firstName} {currentInsured.lastName}
                </h2>
                <InfoRow
                  icon={Phone}
                  label="Téléphone"
                  value={currentInsured.phoneNumber}
                />
                <div className="flex justify-content gap-2 items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mr-3">
                    <LucideBadgeCheck className="w-4 h-4" />
                    Statut du contrat: 
                  </div>
                  <StatusBadge status={currentInsured?.contract?.status} />
                </div>
                
            </div>
            <button
                onClick={() => navigate("/insureds")}
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
        <PersonalInfoTab insured={currentInsured} />
        )}
        {activeTab === "contract" && (
        <ContractTab contract={currentInsured?.contract} />
        )}
        {activeTab === "guarantees" && (
        <GuaranteesTab garanties={currentInsured?.contract} />
        )}
        {activeTab === "claims" && (
        <ClaimsTab currentInsured={currentInsured} />
        )}



      </div>
    </Dashboard>
   
  )
}

export default InsuredDetails