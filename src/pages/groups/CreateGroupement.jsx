import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { User2 } from 'lucide-react';
import { createGroup } from '../../features/group/groupThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../features/group/groupSlice';
import { toast } from 'react-toastify';
import api from '../../util/api';


const CreateGroupement = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {loading, success, error} = useSelector((state) => state.group)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log("DATA",data);
    
    const formData = new FormData();

    formData.append(
      "group",
      new Blob([JSON.stringify({
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      })], { type: "application/json" })
    );

    formData.append("file", data.file[0]);

 await api.post("/uploadExcel", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
   
  };

  
  useEffect(() => {
    if (success) {
      toast.success("Groupement créé avec succès");
      navigate("/groups");
      dispatch(resetState());
    }
  
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);


  return (
    <Dashboard activeMenu="Groupements">

        <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <fieldset disabled={loading} className="space-y-6">
    <div className="flex flex-col gap-4">
      

      {/* ================== ASSURÉ ================== */}
      <div className="bg-white rounded-lg shadow p-6 ">
        <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
          <User2 className='w-4 h-4' />
          <h2 className="text-gray-500 text-lg font-semibold">
            Informations du représentant:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Prénom:"
            placeholder="Prénom du représentant"
            {...register("firstName")}
              error={errors.firstName?.message}
          />

          <Input
            label="Nom:"
            placeholder="Nom du représentant"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Date de naissance:"
            placeholder="Date de naissance"
            type="date"
             {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
          />

          <Input
            label="Téléphone:"
            placeholder="Téléphone"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
          />
        </div>
      </div>

      {/* ================== BÉNÉFICIAIRE ================== */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
          <User2 className='w-4 h-4' />
          <h2 className="text-gray-500 text-lg font-semibold">
            Groupement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Nom du groupement"
            {...register("name")}
            error={errors.name?.message}
          />

         <Input
          type="file"
          accept=".xls,.xlsx"
          {...register("file", {
            required: "Fichier Excel requis",
            setValueAs: (v) => v instanceof FileList ? v[0] : v,
          })}
        />
        </div>
      </div>
    </div>
    {/* ================== ACTION ================== */}
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={() => navigate("/groups")}
        className="px-6 py-2 bg-gray-500 text-white rounded"
      >
        Annuler
      </button>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-700 text-white rounded disabled:opacity-50"
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
      
    </div>
  </fieldset>
  </form>
        </div>
      
     </Dashboard>
  )
}

export default CreateGroupement