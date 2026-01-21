import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllContracts } from '../../features/contract/contractThunk'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import Table from '../../components/Table'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { getAllclaims } from '../../features/claim/claimThunk'
import EmptyState from '../../components/EmptyState'

const columns = [
      {
    header: "Assuré",
    accessor: "insured",
    className: "text-center",
  },
  {
    header: "Date début",
    accessor: "startDate",
  },
  {
    header: "Date fin ",
    accessor: "endDate",
    className: "text-center",
  },
  {
    header: "status",
    accessor: "status",
    className: "text-center",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];

const ClaimList = () => {
     
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const { claims, loading, error } = useSelector((state) => state.claim);

   
   

    useEffect(()=>{
        dispatch(getAllclaims())
    },[dispatch])

    const handleDelete = () => {
      console.log("claim supprimé");
    }

    const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-2 font-medium text-center">
        {item.firstName} {item.lastName}
      </td>
    
     

      <td className="px-4 py-2 text-center">
        {item.hospitalizationStartDate} 
      </td>

      <td className="px-4 py-2 text-center">
        {item.hospitalizationEndDate} 
      </td>

      <td className="px-4 py-2 text-center">
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
    <Dashboard activeMenu="Sinistres">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
        

          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des Sinistres
            </h3>
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

              {/* Button Creation group */}
              <button
                type="button"
                aria-label="Créer un nouvel assuré"
                onClick={() => navigate("/claims/create")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                        hover:bg-blue-700 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-400">
                <PlusCircle className="w-5 h-5" />
                Déclarer un sinistre
              </button>
            </div>
          </div>

          {/* Liste des groups */}
            <div className='card p-4'>
              {/* Table des utilisateurs */}
                {/* Table des utilisateurs */}
              {claims && claims.length > 0 ? (
                <Table columns={columns} renderRow={renderRow} data={claims} />

              ) :
              (
                <EmptyState
                  title="Aucun Sinistre trouvé"
                  description="Commencez par créer un sinistre."
                />

              )}


            </div>
          </div>
       

    </Dashboard>
  )
}

export default  ClaimList;
