import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/user/userThunk';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/auth/authSelectors';
import AddUserForm from '../../components/AddUserForm';
import Modal from '../../components/Modal';
import UsersList from '../../components/UsersList';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import UserCard from '../../components/UserCard';



const UsersListPage = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsers);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  return (

 
      <div className='p-2'>
        {/* Bouton pour ajouter un utilisateur */}
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-semibold'>Liste des utilisateurs</h2>
           {/* Button Creation user */}
          <button
            type="button"
            aria-label="Créer un nouvel assuré"
            onClick={() => navigate("/users/create")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md
                    hover:bg-blue-700 transition
                    focus:outline-none focus:ring-2 focus:ring-blue-400">
            <PlusCircle className="w-5 h-5" />
            Nouvel utilisateur
          </button>
        </div>

        {/* Liste des utilisateurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {usersData?.map((user) => (
    <UserCard key={user.id} user={user} />
  ))}
</div>
      </div>

  )
}

export default UsersListPage