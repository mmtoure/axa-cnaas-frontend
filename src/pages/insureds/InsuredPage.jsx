import Table from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
import EmptyState from '../../components/EmptyState'
import { formatDate } from '../../util/helper'
import { FileText } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllInsureds, getInsureds } from '../../features/insured/insuredThunk'
import { useEffect } from 'react'

import Dashboard from '../../components/Dashboard'
import { PlusCircle } from 'lucide-react'
import api from '../../util/api'
import InsuredList from '../../components/InsuredList'
import StatsGrid from '../../components/StatsGrid'
import { Pagination } from '../../components/Pagination'




const InsuredPage = () => {
  const dispatch = useDispatch()
  const { insureds, content, totalPages, currentPage } = useSelector((state) => state.insured)
  const navigate = useNavigate();

  const handlePageChange = page => {
    dispatch(getInsureds({ page, size: 10 }));
  };

  useEffect(() => {
    dispatch(getAllInsureds())
    dispatch(getInsureds({ page: 0, size: 10 }));
  }, [dispatch])



  return (
    <Dashboard activeMenu="Assurés">
      <div className="p-2">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 max-h-[90vh] overflow-y-auto rounded-lg border border-gray-200 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des assurés
            </h3>
            {/* Button Creation group */}
            <button
              type="button"
              aria-label="Créer un nouvel assuré"
              onClick={() => navigate("/insureds/create")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Nouvel Assuré
            </button>
          </div>
          {/* Liste des groups */}
          <InsuredList insuredsData={content} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Dashboard>
  )
}

export default InsuredPage