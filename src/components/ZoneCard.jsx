import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../util/api";
import { FileText } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import Loader from "./Loader";
import StatusBadge from "./StatusBadge";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserById } from "../features/auth/authThunk";



const ZoneCard = ({ zone, onDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(zone.chefZoneId));
  }, [dispatch, zone.chefZoneId]);

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

 
  

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between relative">
      {loading && <Loader text="Génération de la fiche d’adhésion en cours..." />}
      {/* Menu Kebab en haut à droite */}
      <div className="absolute top-4 right-2" ref={menuRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical size={20} className="text-gray-600" />
        </button>
          {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => navigate(`/zones/edit/${zone.id}`)}
            >

              <Edit size={16} className="mr-2" /> Modifier
            </button>
            <hr className="my-1" />
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                onDelete(zone.id);
                setIsOpen(false);
              }}
            >
              <Trash2 size={16} className="mr-2" /> Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {zone.name}
        </h2>
        <p className="text-sm text-gray-500">
          Chef de zone : {user?.firstName} {user?.lastName}
        </p>
      </div>

     


      {/* Action */}
      <div className="mt-6 flex items-center justify-center">
        <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={() => navigate(`/zones/${zone.id}`)}
        >
          Voir détails
        </button>
      </div>
    </div>
  );
};

export default ZoneCard;