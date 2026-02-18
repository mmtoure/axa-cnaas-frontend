import React, { useEffect } from 'react'
import Dashboard from '../../components/Dashboard'
import { useDispatch } from 'react-redux'

import { getAllPartners } from '../../features/partner/partnerThunk'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import EmptyState from '../../components/EmptyState'
import Table from '../../components/Table'
import { formatDate } from '../../util/helper'

const columns = [
  {
    header: "Titre",
    accessor: "name",
    className: "px-4 py-2 font-medium text-left",
  },
  {
    header: "Téléphone",
    accessor: "phoneNumber",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Date de création",
    accessor: "createdAt",
    className: "text-center",
  },

  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];

const PartnersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {partners} = useSelector((state)=>state.partner)
  useEffect(() => {
    dispatch(getAllPartners())
  }, [dispatch])


  const handleDelete = () => {
    console.log("Insured supprimé");
  }

  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-2 font-medium text-left">
        {item.name}
      </td>
      <td className="px-4 py-2 font-medium text-center">
        {item.phoneNumber}
      </td>

      <td className="px-4 py-2 text-center">
        {item.email}
      </td>
      <td className="px-4 py-2 text-center">
        {formatDate(item?.createdAt)}
      </td>

      <td className="px-4 py-2 flex items-center justify-center gap-1">

        {/* Voir */}
        <button
          type="button"
          onClick={() => navigate(`/partners/${item.id}`)}
          className="p-2 rounded-lg bg-green-50 hover:bg-green-100
                    transition hover:scale-105"
          aria-label="Voir le contrat"
        >
          <Eye className="w-4 h-4 text-green-600" />
        </button>

        {/* Éditer */}
        <button
          onClick={() => navigate(`/partners/edit/${item.id}`)}
          className="p-1 rounded hover:bg-gray-200"
          title="Éditer"
        >
          <Edit className="w-4 h-4 text-blue-600" />
        </button>

        {/* Supprimer */}
        <button
          onClick={() => handleDelete(item.id)}
          className="p-1 rounded hover:bg-gray-200"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </td>
    </tr>
  );
  return (
     
      <Dashboard activeMenu="Partenaires">
         <div className='ml-3 p-6'>
      
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des partenaires
            </h3>
          
            {/* Button Creation partenaire */}
            <button
              type="button"
              aria-label="Créer un nouveau partenaire"
              onClick={() => navigate("/partners/create")}
              className="inline-flex items-center gap-2 px-2 py-2 bg-blue-800 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Nouveau partenaire
            </button>
          </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className='flex items-center justify-content gap-2'>
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

              {/* Button Creation contract */}

            </div>
          {/* Liste des contracts */}
          <div className='card p-4'>
            {/* Table des contracts */}
            {/* Table des contracts */}
            {partners && partners.length > 0 ? (
              <Table columns={columns} renderRow={renderRow} data={partners} />

            ) :
              (
                <EmptyState
                  title="Aucun contrat trouvé"
                  description="Commencez par créer un contrat."
                />

              )}

          </div>
        </div>
         </div>
      </Dashboard >
     
  )
}

export default PartnersList