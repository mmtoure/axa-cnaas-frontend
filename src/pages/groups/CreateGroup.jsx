import React from 'react'
import Dashboard from '../../components/Dashboard'
import Input from '../../components/Input';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insuredSchema } from '../../validations/insuredSchema';
import { useDispatch } from 'react-redux';
import { createInsured } from '../../features/insured/insuredThunk';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetState } from '../../features/insured/insuredSlice';
import { toast } from 'react-toastify';
import { groupSchema } from '../../validations/groupSchema';
import { createGroup } from '../../features/group/groupThunk';
import { useState } from 'react';



const CreateGroup = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const {loading, success, error} = useSelector((state) => state.group)
const[newGroup, setNewGroup] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(groupSchema),
     defaultValues: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    name: "",
    file: undefined,
  },
  });

  


  const onSubmit = async (data) => {
    console.log("DATA", data);
    
    try {
      console.log("creation assuré",data);
      const group =dispatch(createGroup(data))
      setNewGroup(group)
      
      reset();
    } catch (err) {
      alert("Erreur lors de la création", err.message);
    }
  };

useEffect(() => {
  if (success) {
    toast.success("Groupement créé avec succès");
    reset();
    navigate("/groups");
    dispatch(resetState());
  }

  if (error) {
    toast.error(error);
  }
}, [success, error, dispatch, navigate, reset]);
  return (
 <Dashboard activeMenu="Groupements">
  <div className="bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
    <h3 className="text-2xl font-semibold text-black mb-2">
        Création d'un groupement
    </h3>
    <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la création d'un groupement
    </p>

 
  <div className="w-full md:w-2/3 bg-opacity-95 backdrop-blur-sm my-4">

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <fieldset disabled={loading} className="space-y-6">
    <div className="flex flex-col gap-4">
      

      {/* ================== ASSURÉ ================== */}
      <div className="bg-white rounded-lg shadow p-6 ">
        <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
          <User2 className='w-4 h-4' />
          <h2 className="text-gray-500 text-lg font-semibold">
            Informations du groupement:
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
          label="Fichier"
          type="file"
          accept=".xls, .xlsx, .csv"
          
          {...register("file", {
            setValueAs: (value) => value?.[0], // FileList → File
          })}
          error={errors.file?.message}
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
 </div>
</Dashboard>
  )
}

export default CreateGroup