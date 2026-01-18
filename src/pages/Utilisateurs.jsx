import React from 'react'
import Dashboard from '../components/Dashboard'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../features/user/userThunk';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers} from '../features/auth/authSelectors';
import AddUserForm from '../components/AddUserForm';
import Modal from '../components/Modal';
import UsersList from '../components/UsersList';


const Utilisateurs = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUsers);
    const [openAddUserModal, setOpenAddUserModal] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    
  }, [dispatch]);


  return (
  <div className='space-y-6'> 
        <Dashboard activeMenu="Utilisateurs">
      <div className='bg-white rounded-lg shadow-sm p-5 m-5'>
  
        {/* Bouton pour ajouter un utilisateur */}
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-2xl font-semibold'>Liste des utilisateurs</h2>
          <button 
          onClick={()=>setOpenAddUserModal(true)}
            className='add-button flex items-center gap-1 cursor-pointer'>
            <Plus size={15} />
             Ajouter un utilisateur
          </button>
        </div>

        {/* Liste des utilisateurs */}
          <UsersList usersData={usersData} />

        {/* Modal pour ajouter un utilisateur */}

        <Modal
          isOpen={openAddUserModal}
          onClose={() => setOpenAddUserModal(false)}
          title={"Ajouter un nouvel utilisateur"}>
         
        </Modal>

        {/* Modal pour modifier un utilisateur */}
      </div>
    </Dashboard>
  </div>
  )
}

export default Utilisateurs