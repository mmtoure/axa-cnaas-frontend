import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";
import { FileText } from "lucide-react";

const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const insuredCount = group.insureds?.length || 0;

  const partnerName =
    group.insureds?.[0]?.partner?.name || "Non défini";

  const handleGenerateContractByGroup = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/pdf`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(res.data);
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between">

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
      <div className="mt-6">
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