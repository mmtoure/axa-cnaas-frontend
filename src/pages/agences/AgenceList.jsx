import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteAgence, getAgences } from '../../features/agence/agenceThunk';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import RegionCard from '../../components/RegionCard';
import { getRegions } from '../../features/regions/RegionThunk';
import { useMemo } from 'react';

const AgenceList = () => {
  const navigate = useNavigate();
  const {regions} = useSelector((state) => state.region)
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);


  const allRegions = useMemo(() => {
  if (currentUser?.role?.name === "ADMIN") {
    return regions;
  }

  return currentUser?.regions?.length
    ? currentUser.regions
    : currentUser?.network?.regions ?? [];
}, [currentUser, regions]);


  useEffect(() => {
    //dispatch getZones
    dispatch(getRegions());
  }, [dispatch])  

    const handleDelete = async (id) => {
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
              "La agence a été supprimée.",
              "success"
            );
            dispatch(getAgences());
          });
        }
      });
    };
 
  return (
       <div className="p-4 min-h-screen">
        {console.log("regions", allRegions)}
        
        
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
        {allRegions && allRegions?.length === 0 ? (
          <p className="text-gray-500">Aucune agence trouvée.</p>
        ) : (
          allRegions?.map((region) => (
            <RegionCard key={region?.id} region={region} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>

  );
};


export default AgenceList