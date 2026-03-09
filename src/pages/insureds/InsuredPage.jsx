import Table from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/Dashboard'
import { PlusCircle } from 'lucide-react'
import InsuredFilter from '../../components/InsuredFilter'

const InsuredPage = () => {
  const navigate = useNavigate();
  return (
    <Dashboard activeMenu="Assurés">
      <div className='p-2'>
        {/* Bouton pour ajouter un assuré */}
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-2xl font-semibold'>Liste des assurés</h2>
          {/* Button Creation user */}
          <button
            type="button"
            aria-label="Créer un nouvel assuré"
            onClick={() => navigate("/insureds/create")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
            <PlusCircle className="w-5 h-5" />
            Nouvel assuré
          </button>
        </div>

        {/* Liste des utilisateurs */}
        <div className='min-h-screen bg-white rounded-lg'>
          <InsuredFilter />
          
        </div>
      </div>
    </Dashboard>

  )
}

export default InsuredPage