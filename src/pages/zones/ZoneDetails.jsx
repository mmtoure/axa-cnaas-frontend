import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getZoneById } from '../../features/zone/zonethunk';
import { useEffect } from 'react';
import { getAgenceByZoneId } from '../../features/agence/agenceThunk';
import AgenceCard from '../../components/AgenceCard';

const ZoneDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { zone, loading, error } = useSelector((state) => state.zone);
  const { agences } = useSelector((state) => state.agence);

  useEffect(() => {
    dispatch(getZoneById(id));
    dispatch(getAgenceByZoneId(id));
  }, [dispatch, id]);

  return (
     <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {console.log("zone", zone)}
      {console.log("agences", agences)}
        {agences.map((agence) => (
          <AgenceCard key={agence.id} agence={agence}/>  

        ))}
      </div>
  )
}

export default ZoneDetails