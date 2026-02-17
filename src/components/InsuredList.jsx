
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'


import { FileText } from 'lucide-react'

import { useState } from 'react'



import { Search } from 'lucide-react'

import { PlusCircle } from 'lucide-react'

import Table from './Table'
import EmptyState from './EmptyState'
import { formatDate } from '../util/helper'

import api from '../util/api'
const columns = [
  {
    header: "Assuré",
    accessor: "insured",
    className: "text-left px-2"
  },
  {
    header: "Téléphone",
    accessor: "phoneNumber",
    className: "text-left px-2",
  },
  {
    header: "Date de naissance",
    accessor: "dateOfBirth",
    className: "text-left px-2",
  },
  {
    header: "Bénéficiaire",
    accessor: "beneficiary",
    className: "text-left px-2"
  },
   
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];



const InsuredList = ({insuredsData}) => {
  

  const [search, setSearch] = useState("");
  const navigate = useNavigate();



  
 const filteredInsureds = insuredsData.filter((insured) => {
  const term = search.toLowerCase();

  return (
      insured.firstName?.toLowerCase().includes(term) ||
      insured.lastName?.toLowerCase().includes(term) ||
      insured.phoneNumber?.includes(term)
    );
  });

  const handleGenerateContract = async (insuredId) => {
    const res = await api.get(`/insureds/${insuredId}/pdf`, {
      responseType: "blob"
    });

    const url = window.URL.createObjectURL(res.data);
    window.open(url, "_blank");
  };
  

  const handleDelete =() =>{
    console.log("Groupement supprimé");
  }
  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Assuré */}
      <td className="px-2 py-2 text-left">
        {item.firstName} {item.lastName}
      </td>

      {/* Téléphone */}
      <td className="px-2 py-2 text-left">
        {item.phoneNumber}
      </td>

      {/* Date naissance */}
      <td className="px-2 py-2 text-left">
        {formatDate(item.dateOfBirth)}
      </td>

      {/* Bénéficiaire */}
      <td className="px-2 py-2 text-left">
        {item.beneficiary ? (
          <div className="flex flex-col">
            <span className="font-medium">
              {item.beneficiary.firstName} {item.beneficiary.lastName}
            </span>
            <span className="text-xs text-gray-500">
              {item.beneficiary.phoneNumber}
            </span>
          </div>
        ) : (
          <span className="text-gray-400 italic">Aucun</span>
        )}
      </td>
       

      {/* Actions */}
      <td className="px-2 py-2 text-left">
        <div className="flex items-center justify-center gap-1">
      

          <button
            onClick={() => navigate(`/insureds/${item.id}`)}
            className="p-1 rounded hover:bg-gray-200"
            title="Voir"
          >
            <Eye className="w-4 h-4 text-green-600" />
          </button>

          <button
            onClick={() => navigate(`/insureds/edit/${item.id}`)}
            className="p-1 rounded hover:bg-gray-200"
            title="Éditer"
          >
            <Edit className="w-4 h-4 text-blue-600" />
          </button>

          <button
            onClick={() => handleDelete(item.id)}
            className="p-1 rounded hover:bg-gray-200"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>

          <button
            onClick={() => handleGenerateContract(item.id)}
            className="p-1 rounded hover:bg-gray-200"
            title="Generer contrat"
          >
            <FileText className="w-4 h-4 text-green-600" />
          </button>
        </div>
      </td>
    </tr>
  );
  return (
  
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between">  
        <div className="text-gray-700 flex items-center">
          <span>Total assurés: </span>
          <span className="ml-2 text-lamaPurple">
            {insuredsData.length} 
          </span>
          <span className="ml-4 text-gray-500 italic">
            (Filtrés: {filteredInsureds.length})
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un assuré..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 bg-gray-100 rounded-md text-sm
                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

          </div>
        </div>

        {/* Liste des groups */}
        <div className='card p-2'>
          {/* Table des utilisateurs */}
          {filteredInsureds && filteredInsureds.length > 0 ? (
            <Table columns={columns} renderRow={renderRow} data={filteredInsureds} />

          ) :
          (
            <EmptyState
              title="Aucun groupement trouvé"
              description="Commencez par créer un groupement."
            />
          )}

        </div>
      </div>
  )
}

export default InsuredList