import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../features/auth/authThunk';
import { useEffect } from 'react';
import RoleBadge from '../../components/RoleBadge';
import { ArrowLeftCircle } from 'lucide-react';
import { Pencil } from 'lucide-react';
import Input from '../../components/Input';
import { BarChart } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);



  return (
    <div className="p-5 min-h-screen flex flex-col gap-6">
      <div className="w-full md:w-full lg:w-2/3 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between relative gap-4">
        {/* Header */}
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center justify-start gap-4'>

            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
              <p className="font-bold text-lg text-white">{user?.firstName.charAt(0) + user?.lastName.charAt(0)}</p>
            </div>

            <div className="flex flex-col gap-1 ml-4">
              <h2 className="font-semibold text-lg">
                {user?.firstName} {user?.lastName}
              </h2>
              <div className="flex items-center gap-2">
                <RoleBadge role={user?.role.name} />
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate(`/users/change-password/${id}`)}
            className="bg-white border border-blue-900 text-blue-900 px-2 py-1 rounded-full hover:bg-blue-900 
            hover:text-white transition-colors flex items-center justify-center gap-2">

            <span className="text-sm">Changer password</span>
            <Pencil className="h-4 w-4 animate-pulse" />
          </button>

        </div>
      </div>

      <div className="w-full md:w-full lg:w-2/3 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between relative gap-4">
        {/* Header */}

        <div className='flex items-center justify-between gap-4 border-b border-gray-200'>
          <div className='flex items-center gap-2 mb-4 pb-2 '>
            <ArrowLeftCircle className='w-4 h-4' />
            <h2 className="text-gray-500 text-lg font-semibold">
              Informations Personnelles:
            </h2>
          </div>
          <button
            onClick={() => navigate("/users/update/" + id)}
            className="bg-white border border-blue-900 text-blue-900 px-2 py-1 rounded-full hover:bg-blue-900 
            hover:text-white transition-colors flex items-center justify-center gap-2">

            <span className="text-sm">Modifier</span>
            <Pencil className="h-4 w-4 animate-pulse" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="block text-sm text-gray-500 mb-1">
              Prénom:
            </label>
            <p className='font-semibold'>{user?.firstName}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text-gray-500 mb-1">
              Nom:
            </label>
            <p className='font-semibold'>{user?.lastName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <label className="block text-sm text-gray-500 mb-1">
              Email:
            </label>
            <p className='font-semibold'>{user?.email}</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text-gray-500 mb-1">
              Téléphone:
            </label>
            <p className='font-semibold'>{user?.phoneNumber}</p>
          </div>
        </div>


      </div>

      {/* ================== STATISTICS ================== */}
      <div className="w-full md:w-full lg:w-2/3 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between relative gap-4">
        {/* Header */}
        <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 '>
          <BarChart className='w-4 h-4' />
          <h2 className="text-gray-500 text-lg font-semibold">
            Statistiques:
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm text-gray-500 mb-1">
                Zone:
              </label>
              <div className='flex items-center gap-2'>
                <ArrowLeftCircle className='w-4 h-4' />
                <p>{user?.zone?.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-sm text-gray-500 mb-1">
                Agence:
              </label>
              {user?.zone?.agences?.map((a) => (
                <div key={a.id} className="flex items-center gap-2">
                  <ArrowLeftCircle className='w-4 h-4' /> {a.name}
                </div>
                ))}
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm text-gray-500 mb-1">
                Groupements:
              </label>
              <p className='font-semibold'>{user?.groups?.length || 0}</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm text-gray-500 mb-1">
                Assurés:
              </label>
             { <p className='font-semibold'>{user?.insureds?.length || 0}</p>}
            </div>
          </div>
        </div>

      </div>
    </div>



  )
}

export default UserDetails