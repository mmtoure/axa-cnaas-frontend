import Table from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Eye } from 'lucide-react'
import { Edit } from 'lucide-react'
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
    const navigate = useNavigate()

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
      {item.dateOfBirth}
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
      </div>
    </td>
  </tr>
);
  return (
    <div>
        <div className='card p-4'>
         
            {/* Table des utilisateurs */}       
            {insuredsData && insuredsData.length > 0 ? (
                
                <Table columns={columns} renderRow={renderRow} data={insuredsData} />
        
            ):
            (
                <p className='text-gray-500'>Aucun utilisateur trouvé.</p>

            )}
        
        </div>
    </div>
  )
}

export default InsuredList