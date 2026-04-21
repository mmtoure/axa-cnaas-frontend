import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { agenceSchema } from '../../validations/agenceSchema';
import Input from '../../components/Input';
import { getAllUsers } from '../../features/user/userThunk';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getZones, updateZone } from '../../features/zone/zonethunk';
import { getAgenceById, updateAgence } from '../../features/agence/agenceThunk';



const AgenceEdit = () => {
  const { id } = useParams();
  console.log("ID:", id);
  const { agence, loading } = useSelector((state) => state.agence)
  const { users } = useSelector((state) => state.user)
  const {zones} = useSelector((state) => state.zone)
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const chefsReseaux = users.filter(user => user.role.name === "USER") || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(agenceSchema),
    defaultValues: {
      name: "",
      zoneId: "",
      chefAgenceId: ""

    },
  });

    //fetch zone by id and all users for the select input
  useEffect(() => {
    dispatch(getAgenceById(id))
    dispatch(getAllUsers());
    dispatch(getZones());
  }, [dispatch, id])


  // Injecter données dans form
  useEffect(() => {
    if (agence && Object.keys(agence).length > 0) {
      reset({
        name: agence.name ?? "",
        zoneId: agence.zone?.id ?? agence.zoneId ?? "",
        chefAgenceId: agence.chefAgence?.id ?? agence.chefAgenceId ?? "",
      });
    }
  }, [agence, reset]);

  const onSubmit = async (data) => {
    console.log("creation agence", data);
    console.log("ID à mettre à jour:", parseInt(id));
    console.log("Données envoyées pour mise à jour:", { id: parseInt(id), ...data });

    const formData = new FormData();
      formData.append("agence", new Blob([JSON.stringify(
        { "name": data.name, "zoneId": data.zoneId, "chefAgenceId": data.chefAgenceId })], { type: "application/json" }));
        formData.append("id", parseInt(id));
    //dispatch createZone
    dispatch(updateAgence({ id: parseInt(id), ...data })).unwrap()
      .then(() => {
        toast.success("Agence mise à jour avec succès");
        navigate("/agences");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la zone:", error);
        toast.error("Erreur lors de la mise à jour de la zone");
      }); 
  }

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold text-black mb-2">
        Modification d'une agence
      </h3>
      <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la modification d'une agence
      </p>
      <div className="w-full md:w-2/3 bg-opacity-95 backdrop-blur-sm my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-6">
            <div className="flex flex-col gap-4">
              {/* ================== USER ================== */}
              <div className="bg-white rounded-lg shadow p-6 ">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <User2 className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Informations de l'agence:
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Nom Agence:"
                    placeholder="Nom Agence"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                    {/* zone */}
                  <div className="w-full">
                    <label className="block text-sm text-gray-500 mb-1">
                     Choisir la zone de l'agence 
                    </label>

                    <select
                      {...register("zoneId")}
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    > 
                      <option value="">-- Sélectionner --</option>

                      {zones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.id} - {zone.name}
                        </option>
                      ))}
                    </select>

                    {errors.zoneId && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.zoneId.message}
                      </p>
                    )}
                  </div>
                    {/* Chef Agence */}
                  <div className="w-full">
                    <label className="block text-sm text-gray-500 mb-1">
                      Responsable de l'agence   
                    </label>

                    <select
                      {...register("chefAgenceId")}
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    > 
                      <option value="">-- Sélectionner --</option>

                      {chefsReseaux.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.id} - {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>

                    {errors.chefAgenceId && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.chefAgenceId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>


            {/* ================== ACTION ================== */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/agences")}
                className="px-6 py-2 bg-gray-500 text-white rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-700 text-white rounded disabled:opacity-50"
              >
                {loading ? "Modification..." : "Modifier"}
              </button>

            </div>
          </fieldset>
        </form>
      </div>
    </div >
  )
}

export default AgenceEdit