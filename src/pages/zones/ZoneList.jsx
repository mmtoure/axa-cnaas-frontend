import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteZone, getZones } from '../../features/zone/zonethunk';
import ZoneCard from '../../components/ZoneCard';
import Swal from 'sweetalert2';

const ZoneList = () => {
  const navigate = useNavigate();
  const {zones} = useSelector((state) => state.zone)
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch getZones
    dispatch(getZones());
  }, [dispatch])

    const handleDelete = (id) => {
      console.log("Deleting insured with ID:", id);
      Swal.fire({
        title: "Supprimer ?",
        text: "Cette action est irréversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteZone(id)).then(() => {
            dispatch(getZones());
            Swal.fire(
              "Supprimé!",
              "Le zone a été supprimé.",
              "success"
            );
          });
        }
      });
    };
 
  return (
       <div className="p-4 min-h-screen">
        {console.log("zones", zones)}
        
        
     {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des zones
            </h3>
          
            {/* Button Creation zone */}
            <button
              type="button"
              aria-label="Créer un nouvelle zone"
              onClick={() => navigate("/zones/create")}
              className="inline-flex items-center gap-2 px-2 py-2 bg-blue-900 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Créer une zone
            </button>
          </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {zones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} onDelete={handleDelete} />  

        ))}
      </div>
    </div>

  );
};


export default ZoneList