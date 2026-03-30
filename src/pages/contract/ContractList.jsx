import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { generateContractPdf, getAllContracts, getContracts } from '../../features/contract/contractThunk'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { PlusCircle } from 'lucide-react'
import Table from '../../components/Table'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import EmptyState from '../../components/EmptyState'
import { FileText } from 'lucide-react'
import { LucideFileText } from 'lucide-react'
import { Pagination } from '../../components/Pagination'
import { tr } from 'zod/locales'
import Loader from '../../components/Loader'
import StatusBadge from '../../components/StatusBadge'

const columns = [
  {
    header: "Assuré",
    accessor: "insured",
    className: "px-4 py-2 font-medium text-left",
  },
  {
    header: "Numéro police",
    accessor: "policeNumber",
     className: "hidden md:table-cell text-center",
  },
  {
    header: "Date début",
    accessor: "startDate",
    className: "hidden md:table-cell text-center",
  },
  {
    header: "Date fin ",
    accessor: "endDate",
    className: "hidden md:table-cell text-center",
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


export const ContractList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const { contracts, content, totalPages, currentPage } = useSelector((state) => state.contract);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    dispatch(getAllContracts())
    dispatch(getContracts({ page: 0, size: 10 }));

  }, [dispatch])

  const handlePageChange = page => {
    dispatch(getContracts({ page, size: 10 }));
  };

  const handleDelete = () => {
    console.log("Insured supprimé");
  }

  const generatePdf = async (contractId) => {
    try {
      setLoading(true);
    const res = await dispatch(generateContractPdf(contractId));
    if (res.meta.requestStatus === "fulfilled") {
      const blob = new Blob([res.payload], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");
      const a = document.createElement("a");
      a.href = url;
      a.download = "fiche_adhesion_individuelle.pdf";
      a.click();

      setTimeout(() => window.URL.revokeObjectURL(url), 1000);

    }
  }
    catch (err) {
      alert("Erreur lors de la génération du contrat", err.message);
    }
    finally {
      setLoading(false);
    } 




  };

  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-2 font-medium text-left">
        {item.firstName} {item.lastName}
      </td>
      <td className="hidden md:table-cell px-4 py-2 font-medium text-center">
        {item.policeNumber}
      </td>

      <td className="hidden md:table-cell px-4 py-2 text-center">
        {item.startDate}
      </td>

      <td className="hidden md:table-cell px-4 py-2 text-center">
        {item.endDate}
      </td>

      <td className="px-4 py-2 text-center">
        <StatusBadge status={item.status} />
      </td>
     

      <td className="px-4 py-2 flex items-center justify-center gap-1">
        {/* PDF */}
        <button
          onClick={() => generatePdf(item.id)}
          className="p-1 rounded hover:bg-gray-200"
          title="Voir"
        >
          <FileText className="w-4 h-4 text-green-600" />
        </button>
        {/* Voir */}
        <button
          type="button"
          onClick={() => navigate(`/contracts/${item.id}`)}
          className="p-2 rounded-lg bg-green-50 hover:bg-green-100
                    transition hover:scale-105"
          aria-label="Voir le contrat"
        >
          <Eye className="w-4 h-4 text-green-600" />
        </button>
      </td>
    </tr>
  );

  return (


      <div className="bg-white rounded-lg shadow-sm p-6 m-3">

      {loading && <Loader text="Génération de la fiche d’adhésion en cours..." /> }
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

            {/* Button Creation contract */}

          </div>
        </div>

        {/* Liste des contracts */}
        <div className='card p-4'>
          {/* Table des contracts */}
          {contracts && contracts.length > 0 ? (
            <>
            {console.log("CONTENT", content)}
            
              <Table columns={columns} renderRow={renderRow} data={content} />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) :
            (
              <EmptyState
                title="Aucun contrat trouvé"
                description="Commencez par créer un contrat."
              />

            )}


        </div>
      </div>
  )
}
