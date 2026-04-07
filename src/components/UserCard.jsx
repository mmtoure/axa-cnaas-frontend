import React from 'react'
import { Mail, Phone, User, Building2, Users2, BedDouble } from "lucide-react";
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { Edit } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { useNavigate } from "react-router-dom";
import RoleBadge from './RoleBadge';


const UserCard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

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
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between relative gap-4">
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
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit size={16} className="mr-2" /> Modifier
            </button>
            <hr className="my-1" />
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                //onDelete(group.id);
                setIsOpen(false);
              }}
            >
              <Trash2 size={16} className="mr-2" /> Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <div className='flex flex-col items-center'>

        <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
          {user.firstName.charAt(0) + user.lastName.charAt(0)}
        </div>

        <div>
          <h2 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h2>
        </div>

        <div>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>

      </div>


      {/* Body */}
     <div className='flex flex-col items-center'>
        <div className="flex items-center gap-2">
          <RoleBadge role={user.role.name} />
        </div>
      </div>

      <hr className="my-1 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent border-0" />
      {/* Statistics */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className='text-sm text-gray-500 text-center font-semibold'>17</span>
          <span className='text-sm text-gray-500'>Assurés</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className='text-sm text-gray-500 text-center font-semibold'>3</span>
          <span className='text-sm text-gray-500'>Groupements</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className='text-sm text-gray-500 text-center font-semibold'>19</span>
          <span className='text-sm text-gray-500' >Sinistres</span>
        </div>

       
      </div>


      {/* Footer */}
      

        <button
          onClick={() => navigate(`/users/${user.id}`)}
          className="text-sm bg-white border border-blue-900 text-blue-900 px-3 py-3 rounded hover:bg-blue-900 hover:text-white transition-colors w-full flex items-center justify-center gap-2"
        >
          Voir profil
        </button>
      
    </div>
  );
}

export default UserCard