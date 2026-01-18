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

const columns = [
      {
    header: "Assuré",
    accessor: "insured",
    className: "text-center",
  },
  {
    header: "Numéro police",
    accessor: "policeNumber",
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
    header: "Souscription",
    accessor: "typeContract",
    className: "text-center",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];


export const ContractList = () => {
     
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const { contracts, loading, error } = useSelector((state) => state.contract);

   
   

    useEffect(()=>{
        dispatch(getAllContracts())
    },[dispatch])

    const handleDelete = () => {
      console.log("Insured supprimé");
    }

    const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-2 font-medium text-center">
        {item.firstName} {item.lastName}
      </td>
      <td className="px-4 py-2 font-medium text-center">
        {item.policeNumber}
      </td>

      <td className="px-4 py-2 text-center">
        {item.startDate} 
      </td>

       <td className="px-4 py-2 text-center">
        {item.endDate} 
      </td>

      <td className="px-4 py-2 text-center">
        {item.status}
      </td>
          <td className="px-4 py-2 text-center">
        {item?.typeContract}
      </td>

      <td className="px-4 py-2 flex items-center justify-center gap-1">
        {/* Voir */}
        <button
          onClick={() => navigate(`/contracts/${item.id}`)}
          className="p-1 rounded hover:bg-gray-200"
          title="Voir"
        >
          <Eye className="w-4 h-4 text-green-600" />
        </button>

        {/* Éditer */}
        <button
          onClick={() => navigate(`/contracts/edit/${item.id}`)}
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
    <Dashboard activeMenu="Contracts">
        <div className="bg-white rounded-lg shadow-sm p-6 m-3">
        

          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des contrats
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
                onClick={() => navigate("/contracts/create")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                        hover:bg-blue-700 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-400">
                <PlusCircle className="w-5 h-5" />
                Nouvel contrat
              </button>
            </div>
          </div>

          {/* Liste des groups */}
            <div className='card p-4'>
              {/* Table des utilisateurs */}
                {/* Table des utilisateurs */}
              {contracts && contracts.length > 0 ? (
                <Table columns={columns} renderRow={renderRow} data={contracts} />

              ) :
              (
                <p className='text-gray-500'>Aucun utilisateur trouvé.</p>

              )}


            </div>
          </div>
       

    </Dashboard>
  )
}
