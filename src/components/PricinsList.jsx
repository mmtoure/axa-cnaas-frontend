

import { useNavigate } from 'react-router-dom';
import Table from './Table';
import { Edit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import EmptyState from './EmptyState';

const columns = [
  {
    header: "Montant prime",
    accessor: "montantPrime",
    className: "text-left px-4",
  },
    {
    header: "Montant prime TTC",
    accessor: "montantPrime",
    className: "text-left px-4",
  },
  {
    header: "Capital",
    accessor: "capitalMAX",
    className: "text-left px-4",
  },

  {
    header: "plafondNuitsParAn",
    accessor: "plafondNuitsParAn",
    className: "text-left px-4",
  },

  {
    header: "montantParNuit",
    accessor: "montantParNuit",
    className: "text-left px-4",
  },
  {
    header: "category",
    accessor: "category",
    className: "text-left px-4",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "text-center",
  },
];


const PricingsList = ({ pricings }) => {
  const navigate = useNavigate();
  console.log("pricings", pricings);


  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-4 py-2 text-left">
        {item.montantPrime}
      </td>
      <td className="px-4 py-2 text-left">
        {item.montantPrimeTTC}
      </td>
      <td className="px-4 py-2 text-left">
        {item.capitalMAX}
      </td>
      <td className="px-4 py-2 text-left">
        {item.plafondNuitsParAn}
      </td>
      <td className="px-4 py-2 text-left">
        {item.montantParNuit}
      </td>
      <td className="px-4 py-2 text-left">
        {item.category}
      </td>


      <td className="px-4 py-2 flex items-center justify-center gap-1">
        {/* Éditer */}
        <button
          onClick={() => navigate(`/sinistres/edit/${item.id}`)}
          className="p-1 rounded hover:bg-gray-200"
          title="Éditer"
        >
          <Edit className="w-4 h-4 text-blue-600" />
        </button>

        {/* Supprimer */}
        <button
          onClick={() => (console.log("pricing supprimé"))}
          className="p-1 rounded hover:bg-gray-200"
          title="Supprimer"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </td>
    </tr>
  );


  return (
  <div className=''>
          {/* HEADER */}
      <div className='flex flex-col items-left justify-between gap-2'>

        <div className=''>
          <h1 className='text-2xl font-semibold text-gray-700'>Liste des pricings</h1>
        </div>


  
        {/* Table des sinistres */}
        {pricings && pricings.length > 0 ? (
          <Table columns={columns} renderRow={renderRow} data={pricings} />
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

export default PricingsList