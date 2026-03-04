import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllPartners } from '../../features/partner/partnerThunk';
import PartnerCard from '../../components/PartnerCard';
import Dashboard from '../../components/Dashboard';
import { PlusCircle } from 'lucide-react';

const PartnerListCard = () => {
     const dispatch = useDispatch()
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {partners} = useSelector((state)=>state.partner)
  useEffect(() => {
    dispatch(getAllPartners())
  }, [dispatch])
   return (
     <Dashboard activeMenu="Partenaires">
    <div className="p-4 min-h-screen">
        
     {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Gestion des partenaires
            </h3>
          
            {/* Button Creation partenaire */}
            <button
              type="button"
              aria-label="Créer un nouveau partenaire"
              onClick={() => navigate("/partners/create")}
              className="inline-flex items-center gap-2 px-2 py-2 bg-blue-900 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
              <PlusCircle className="w-5 h-5" />
              Nouveau partenaire
            </button>
          </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
    </Dashboard>
  );
};

export default PartnerListCard