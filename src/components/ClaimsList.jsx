import { Search } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from './Table';
import { Edit } from 'lucide-react';
import { Eye } from 'lucide-react';
import { formatDate } from '../util/helper';
import { Trash2 } from 'lucide-react';

const columns = [
    {
    header: "Prénom et Nom",
    accessor: "firstName",
    className: "text-left px-4",
  },
  {
    header: "Type de sinistre",
    accessor: "sinisterType",
    className: "text-left px-4",
  },
  {
    header: "Date début",
    accessor: "startDate",
    className: "text-left px-4",
  },
  {
    header: "Date fin ",
    accessor: "endDate",
    className: "text-left px-4",
  },
  {
    header: "status",
    accessor: "status",
    className: "text-left px-4",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];


const ClaimsList = ({claims}) => {
const navigate = useNavigate();
const [search, setSearch] = useState("");

const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-2 text-left">
        {item.sinisterType}
      </td>
      <td className="px-4 py-2 text-left">
        {formatDate(item.hospitalizationStartDate)} 
      </td>

      <td className="px-4 py-2 text-left">
        {formatDate(item.hospitalizationEndDate)} 
      </td>

      <td className="px-4 py-2 text-left">
        {item.status}
      </td>

      <td className="px-4 py-2 flex items-center justify-center gap-1">
        {/* Voir */}
        <button
          onClick={() => navigate(`/claims/${item.id}`)}
          className="p-1 rounded hover:bg-gray-200"
          title="Voir"
        >
          <Eye className="w-4 h-4 text-green-600" />
        </button>
        {/* Éditer */}
        <button
          onClick={() => navigate(`/claims/edit/${item.id}`)}
          className="p-1 rounded hover:bg-gray-200"
          title="Éditer"
        >
          <Edit className="w-4 h-4 text-blue-600" />
        </button>

        {/* Supprimer */}
        <button
          onClick={() => (console.log("claim supprimé"))}
          className="p-1 rounded hover:bg-gray-200"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </td>
    </tr>
  );

  
 const filteredClaims = claims.filter((claim) => {
  const term = search.toLowerCase();
  return (
      claim.hospitalizationStartDate?.toLowerCase().includes(term) ||
      claim.hospitalizationEndDate?.toLowerCase().includes(term) ||
      claim.sinisterType?.includes(term)
    );
  });

  return (
    <div>
        {/* HEADER */}
        <div className='flex items-center justify-between gap-2'>

            <div className=''>
                <h1 className='text-2xl font-semibold text-gray-700'>Liste des sinistres</h1>
                <p className='text-sm text-gray-500'>Gérez tous les sinistres enregistrés dans le système.</p>  
            </div>

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
  
        <div className='card p-4'>
            {/* Table des sinistres */}
            {filteredClaims && filteredClaims.length > 0 ? (
                <Table columns={columns} renderRow={renderRow} data={filteredClaims} />
            ) :
            (
                <EmptyState
                title="Aucun Sinistre trouvé"
                description="Commencez par créer un sinistre."
                />
            )}
            </div>
      </div>
  )
}

export default ClaimsList