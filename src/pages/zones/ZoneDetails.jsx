import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getZoneById } from '../../features/zone/zonethunk';
import { useEffect } from 'react';
import { getAgenceByZoneId } from '../../features/agence/agenceThunk';
import AgenceCard from '../../components/AgenceCard';
import { PlusCircle } from 'lucide-react';

const ZoneDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { zone, loading, error } = useSelector((state) => state.zone);
  const { agences } = useSelector((state) => state.agence);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getZoneById(id));
    dispatch(getAgenceByZoneId(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (error) return <p className="p-6 text-red-600">Erreur</p>;
  if (!zone) return null;
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
              onClick={() => navigate(`agences/create`)}
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


export default ZoneDetails