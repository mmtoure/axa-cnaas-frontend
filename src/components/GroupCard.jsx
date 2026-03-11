import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";
import { FileText } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";



const GroupCard = ({ group, onDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const insuredCount = group.insureds?.length || 0;
  const partnerName = group.insureds?.[0]?.partner?.name || "Non défini";

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleGenerateContractByGroup = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/pdf`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(res.data);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between relative">
      {/* Menu Kebab en haut à droite */}
      <div className="absolute top-4 right-2" ref={menuRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical size={20} className="text-gray-600" />
        </button>
          {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit size={16} className="mr-2" /> Modifier
            </button>
            <hr className="my-1" />
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                onDelete(group.id);
                setIsOpen(false);
              }}
            >
              <Trash2 size={16} className="mr-2" /> Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {group.name}
        </h2>
        <p className="text-sm text-gray-500">
          Responsable : {group.firstName} {group.lastName}
        </p>
      </div>

      {/* Infos */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>📞 {group.phoneNumber}</p>
        <p>👥 {insuredCount} assuré(s)</p>
        <p>🏢 {partnerName}</p>
      </div>

      {/* Status */}
      <div className="mt-4">
        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
          Actif
        </span>
      </div>

       {/* Générer le contrat */}
         <div className="mt-4">
        <button
          onClick={() => handleGenerateContractByGroup(group.id)}
          className="p-1 rounded hover:bg-gray-200"
          title="Générer le contrat"
        >
        <div className="flex items-center gap-1">
        <FileText className="w-4 h-4 text-green-600" />
          <p className="text-xs mt-1">Fiche adhésion</p>
        </div>
        </button>
        </div>

      {/* Action */}
      <div className="mt-6 flex items-center justify-center">
        <button className="w-full bg-blue-900 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        onClick={() => navigate(`/groups/${group.id}`)}
        >
          Voir détails
        </button>
      </div>
    </div>
  );
};

export default GroupCard;