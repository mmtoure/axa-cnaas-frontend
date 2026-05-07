import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getReseauById } from '../../features/reseau/reseauThunk';
import { useEffect } from 'react';
import { getAgenceByZoneId } from '../../features/agence/agenceThunk';

import { PlusCircle } from 'lucide-react';
import RegionCard from '../../components/RegionCard';

const ReseauDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reseau, loading, error } = useSelector((state) => state.reseau);
  const { agences } = useSelector((state) => state.agence);
  const navigate = useNavigate();
  const regions = reseau?.regions || [];

  useEffect(() => {
    dispatch(getReseauById(id));
    dispatch(getAgenceByZoneId(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur</p>;
  if (!reseau) return null;
  return (
       <div className="p-4 min-h-screen">
        {console.log("regions", regions)}
        
        
     {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des réseaux - {reseau.name}
            </h3>
          
            {/* Button Creation zone */}
            <button
              type="button"
              aria-label="Créer un nouvelle agence"
              onClick={() => navigate(`agences/create`)}
              className="inline-flex items-center gap-2 px-2 py-2 bg-blue-900 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Créer une agence
            </button>
          </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {regions.map((region) => (
          <RegionCard key={region.id} region={region}/>  

        ))}
      </div>
    </div>

  );
};


export default ReseauDetails