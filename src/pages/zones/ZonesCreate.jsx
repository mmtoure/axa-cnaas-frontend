import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { zoneSchema } from '../../validations/zoneSchema'
import { createZone } from '../../features/zone/zonethunk'
import Input from '../../components/Input'
import { toast } from 'react-toastify'
import { User2 } from 'lucide-react'
import { useEffect } from 'react'
import { getAllUsers } from '../../features/user/userThunk'

const ZonesCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.zone)
  const { users } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch])

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

  const onSubmit = async (data) => {
    console.log("creation zone", data);
    //dispatch createZone
    dispatch(createZone(data))
      .unwrap()
      .then(() => {
        toast.success("Zone créée avec succès");
        navigate("/zones");
        reset()
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold text-black mb-2">
        Création d'une zone
      </h3>
      <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la création d'une zone
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
                  <div className="w-full">
                    <label className="block text-sm text-gray-500 mb-1">
                      Selectionner le responsable de la zone:
                    </label>
                    <select name="chefsReseaux" id="chefsReseaux"
                      {...register("chefZoneId")}
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Sélectionner --</option>
                      {chefsReseaux.map((user) => (
                        <>

                          <option key={user.id} value={user.id}>
                            {user.id} - {user.firstName} {user.lastName}
                          </option>
                        </>
                      ))}

                    </select>
                    {errors.chefZoneId && (
                      <p className="text-xs text-red-600 mt-1">{errors.chefZoneId.message}</p>
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
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>

            </div>
          </fieldset>
        </form>
      </div>
    </div >
  )
}

export default ZonesCreate