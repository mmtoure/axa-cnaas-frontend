import React from 'react'
import { Banknote } from 'lucide-react';
import api from '../../../util/api';
import { FileText } from 'lucide-react';
import { Eye } from 'lucide-react';

const ContractTab = ({ group }) => {

  const contract = group?.insureds[0]?.contract
  const nbAssures = group?.insureds?.length

  const handleGenerateContractByGroup = async (groupId) => {
    console.log(groupId);
    
    const res = await api.get(`/groups/${groupId}/pdf`, {
      responseType: "blob"
    
      
    });
       const url = window.URL.createObjectURL(res.data);
    window.open(url, "_blank");
  }

  return (

    <div className="space-y-6">
      {console.log("Contract", contract)
      }
      {/* PRIMES TABLE */}
      <div className="bg-white rounded-xl shadow p-6 mb-4">
        <div className='lg:flex lg:items-center lg:justify-between mb-4'>
          <div className="flex items-center gap-2">
            <Banknote className="text-green-600" />
            <h3 className="font-semibold">Détail des primes</h3>
          </div>
          {/* Générer le contrat */}
          <button
            type="button"
            onClick={()=>handleGenerateContractByGroup(group?.id)}
            className="p-2 rounded-lg bg-green-50 hover:bg-green-100
                  transition hover:scale-105 flex items-center gap-1 border border-gray-200"
            aria-label="Voir le contrat"
          >
            <FileText className="w-4 h-4 text-green-600" /> Fiche Adhésion
          </button>
        </div>

        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Élément</th>
              <th className="p-3 text-right">Montant (FCFA)</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">Nombre d'assurés</td>
              <td className="p-3 text-right">{nbAssures}</td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Prime HT</td>
              <td className="p-3 text-right">{contract?.montantPrime}</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Frais Accessoires</td>
              <td className="p-3 text-right">{contract?.accessoryCost}</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Taxe</td>
              <td className="p-3 text-right">{contract?.tax}</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Prime TTC</td>
              <td className="p-3 text-right">{contract?.montantPrimeTTC}</td>
            </tr>
            <tr className="border-t bg-blue-50 font-semibold">
              <td className="p-3">Montant total des primes</td>
              <td className="p-3 text-right">{contract?.montantPrimeTTC * nbAssures} CFA</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  )
}

export default ContractTab