import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ZoneCard from '../../components/ZoneCard';
import Swal from 'sweetalert2';
import { deleteAgence, getAgences } from '../../features/agence/agenceThunk';
import AgenceCard from '../../components/AgenceCard';

const AgenceList = () => {
  const navigate = useNavigate();
  const {agences} = useSelector((state) => state.agence)
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch getZones
    dispatch(getAgences());
  }, [dispatch])

    const handleDelete = (id) => {
      console.log("Deleting agence with ID:", id);
      Swal.fire({
        title: "Supprimer ?",
        text: "Cette action est irréversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAgence(id)).then(() => {
            
            Swal.fire(
              "Supprimé!",
              "Le zone a été supprimé.",
              "success"
            );
            dispatch(getAgences());
          });
        }
      });
    };
 
  return (
       <div className="p-4 min-h-screen">
        {console.log("agences", agences)}
        
        
     {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des agences
            </h3>
          
            {/* Button Creation zone */}
            <button
              type="button"
              aria-label="Créer un nouvelle agence"
              onClick={() => navigate("/agences/create")}
              className="inline-flex items-center gap-2 px-2 py-2 bg-blue-900 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Créer une agence
            </button>
          </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {agences.map((agence) => (
          <AgenceCard key={agence.id} agence={agence}/>  

        ))}
      </div>
    </div>

  );
};


export default AgenceList