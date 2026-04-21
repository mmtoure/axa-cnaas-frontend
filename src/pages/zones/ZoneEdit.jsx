import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getZoneById } from '../../features/zone/zonethunk';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { zoneSchema } from '../../validations/zoneSchema';
import Input from '../../components/Input';
import { getAllUsers } from '../../features/user/userThunk';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateZone } from '../../features/zone/zonethunk';


const ZoneEdit = () => {
  const { id } = useParams();
  console.log("ID:", id);
  const { zone, loading } = useSelector((state) => state.zone)
  const { users } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const chefsReseaux = users.filter(user => user.role.name === "MANAGER") || [];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(zoneSchema),
    defaultValues: {
      name: "",
      chefZoneId: ""
    },
  });

    //fetch zone by id and all users for the select input
  useEffect(() => {
    dispatch(getZoneById(id))
    dispatch(getAllUsers());
  }, [dispatch, id])


  // Injecter données dans form
  useEffect(() => {
    if (zone && Object.keys(zone).length > 0) {
      reset({
        name: zone.name ?? "",
        chefZoneId: zone.chefZone?.id ?? zone.chefZoneId ?? "",
      });
    }
  }, [zone, reset]);

  const onSubmit = async (data) => {
    console.log("creation zone", data);
    console.log("ID à mettre à jour:", parseInt(id));
    console.log("Données envoyées pour mise à jour:", { id: parseInt(id), ...data });

    const formData = new FormData();
      formData.append("zone", new Blob([JSON.stringify(
        { "name": data.name, "chefZoneId": data.chefZoneId })], { type: "application/json" }));
        formData.append("id", parseInt(id));
    //dispatch createZone
    dispatch(updateZone({ id: parseInt(id), ...data })).unwrap()
      .then(() => {
        toast.success("Zone mise à jour avec succès");
        navigate("/zones");
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la zone:", error);
        toast.error("Erreur lors de la mise à jour de la zone");
      }); 
  }

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold text-black mb-2">
        Modification d'une zone
      </h3>
      <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la modification d'une zone
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
                    Informations de la zone:
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Nom Zone:"
                    placeholder="Nom Zone"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                    {/* Chef Zone */}
                  <div className="w-full">
                    <label className="block text-sm text-gray-500 mb-1">
                      Responsable de la zone
                    </label>

                    <select
                      {...register("chefZoneId")}
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Sélectionner --</option>

                      {chefsReseaux.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.id} - {user.firstName} {user.lastName}
                        </option>
                      ))}
                    </select>

                    {errors.chefZoneId && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.chefZoneId.message}
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
                onClick={() => navigate("/zones")}
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

export default ZoneEdit