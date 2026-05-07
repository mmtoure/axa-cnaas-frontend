import { PlusCircle } from 'lucide-react';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ZoneCard from '../../components/ReseauCard';
import Swal from 'sweetalert2';
import { deleteReseau, getReseaux } from '../../features/reseau/reseauThunk';
import ReseauCard from '../../components/ReseauCard';
import { useMemo } from 'react';
import { selectCurrentUser } from '../../features/auth/authSelectors';

const ReseauList = () => {
  const navigate = useNavigate();
  const {reseaux} = useSelector((state) => state.reseau)
  const dispatch = useDispatch();
   const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    //dispatch getZones
    dispatch(getReseaux());
  }, [dispatch])

    const allNetworks = useMemo(() => {
    if (currentUser?.role?.name === "ADMIN") {
      return reseaux;
    }
    return [currentUser?.network]
  }, [currentUser, reseaux]);

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
          dispatch(deleteReseau(id)).then(() => {
            dispatch(getReseaux());
            Swal.fire(
              "Supprimé!",
              "Le reseau a été supprimé.",
              "success"
            );
          });
        }
      });
    };
 
  return (
       <div className="p-4 min-h-screen">
       
        
        
     {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des réseaux
            </h3>
          
            {/* Button Creation zone */}
            <button
              type="button"
              aria-label="Créer un nouvelle zone"
              onClick={() => navigate("/reseaux/create")}
              className="inline-flex items-center gap-2 px-2 py-2 bg-blue-900 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Créer un reseau
            </button>
          </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {console.log("reseaux", allNetworks)}
        {allNetworks?.map((reseau) => (
          <ReseauCard key={reseau?.id} reseau={reseau} onDelete={handleDelete} />  

        ))}
      </div>
    </div>

  );
};


export default ReseauList