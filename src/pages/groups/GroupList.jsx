import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { generateContractByGroup, getAllGroups } from '../../features/group/groupThunk'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
import Table from '../../components/Table'
import EmptyState from '../../components/EmptyState'
import { FileText } from 'lucide-react'
import api from '../../util/api'

const columns = [
  {
    header: "Nom",
    accessor: "name",
    className: "text-left px-2"
  },
  {
    header: "Représentant",
    accessor: "representant",
    className: "text-left px-2"
  },
  {
    header: "Téléphone",
    accessor: "phoneNumber",
    className: "text-left px-2"

  },
  {
    header: "Nombre assurés",
    accessor: "insuredCount",
    className: "text-center px-2"
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];


const GroupList = () => {
  const dispatch = useDispatch()
  const { groups, generateContract, loading, error } = useSelector((state) => state.group)
  const navigate = useNavigate()
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllGroups())
  }, [dispatch])

  const filteredGroups = groups.filter((group) => {
    const term = search.toLowerCase();

    return (
      group.name?.toLowerCase().includes(term) ||
      group.firstNameRepresentant?.toLowerCase().includes(term) ||
      group.lastNameRepresentant?.toLowerCase().includes(term) ||
      group.phoneNumberRepresentant?.includes(term)
    );
  });


  const handleDelete = () => {
    console.log("Insured supprimé");

  }

  const handleGenerateContractByGroup = async (groupId) => {
    const res = await api.get(`/groups/${groupId}/pdf`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(res.data);
    window.open(url, "_blank");
  };


  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="text-left px-2 py-2 font-medium">
        {item.name}
      </td>

      <td className="text-left px-2 py-2">
        {item.firstName} {item.lastName}
      </td>

      <td className="text-left px-2 py-2">
        {item.phoneNumber}
      </td>

      <td className="text-center px-2 py-2">
        {item.insureds?.length ?? 0}
      </td>

      <td className="px-4 py-2 flex items-center justify-center gap-1">


        {/* Voir */}
        <button
          type="button"
          onClick={() => navigate(`/groups/${item.id}`)}
          className="p-2 rounded-lg bg-green-50 hover:bg-green-100
                  transition hover:scale-105"
          aria-label="Voir le contrat"
        >
          <Eye className="w-4 h-4 text-green-600" />
        </button>

        {/* Éditer */}
        <button
          onClick={() => navigate(`/groups/edit/${item.id}`)}
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

        {/* Générer le contrat */}
        <button
          onClick={() => handleGenerateContractByGroup(item.id)}
          className="p-1 rounded hover:bg-gray-200"
          title="Générer le contrat"
        >
          <FileText className="w-4 h-4 text-green-600" />
        </button>
      </td>
    </tr>
  );
  return (
    <Dashboard activeMenu="Groupements">
          <div className="p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-700">
          Gestion des groupements
        </h3>

        {/* Button Creation group */}
        <button
          type="button"
          aria-label="Créer un nouvel assuré"
          onClick={() => navigate("/groups/create")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                        hover:bg-blue-700 transition
                        focus:outline-none focus:ring-2 focus:ring-blue-400">
          <PlusCircle className="w-5 h-5" />
          Créer un groupement
        </button>
      </div>
      <div className="bg-white bg-opacity-95 backdrop-blur-sm p-8 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
        <div className='flex items-center justify-between gap-2'>
          <div className="text-gray-700 flex items-center">
          <span>Total groupements: </span>
          <span className="ml-2 text-lamaPurple">
            {filteredGroups.length} 
          </span>
          <span className="ml-4 text-gray-500 italic">
            (Filtrés: {filteredGroups.length})
          </span>
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

          {/* Liste des groups */}
          <div className='card p-4'>
            {/* Table des utilisateurs */}
            {filteredGroups && filteredGroups.length > 0 ? (
              <Table columns={columns} renderRow={renderRow} data={filteredGroups} />

            ) :
              (
                <EmptyState
                  title="Aucun groupement trouvé"
                  description="Commencez par créer un groupement."
                />
              )}

          </div>
        </div>
        </div>
      
    </Dashboard>
  )
}

export default GroupList