import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../components/Input'
import { toast } from 'react-toastify'
import { agenceSchema } from '../../validations/agenceSchema'
import { createAgence } from '../../features/agence/agenceThunk'
import { selectCurrentUser } from '../../features/auth/authSelectors'
import { useEffect } from 'react'
import { getReseaux } from '../../features/reseau/reseauThunk'
import { User2 } from 'lucide-react'
import { getAllUsers } from '../../features/user/userThunk'

const AgencesCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.agence)
  const { reseaux } = useSelector((state) => state.reseau)
  const currentUser = useSelector(selectCurrentUser);
  const { users } = useSelector((state) => state.user)
  const { id } = useParams();
  const reseau = reseaux.find((r) => r.id === parseInt(id));
  console.log("Réseau:", reseau);


  console.log("Zone ID:", id);

  useEffect(() => {
    dispatch(getReseaux());
    dispatch(getAllUsers());
  }, [dispatch])


  const chefAgences = users.filter(user => user.role.name === "USER");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(agenceSchema),
    defaultValues: {
      name: "",
      zoneId: "",
      chefAgenceId: ""
    },
  });

  useEffect(() => {
    if (id) {
      setValue("zoneId", id);
    }
  }, [id]);

  const onSubmit = async (data) => {
    console.log("creation agence", data);
    if (reseau) {
      data.zoneId = reseau.id;
    }

    //dispatch createAgence
    dispatch(createAgence(data))
      .unwrap()
      .then(() => {
        toast.success("Agence créée avec succès");
        navigate(`/reseaux/${data.zoneId}`);
        reset()
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold text-black mb-2">
        Création d'une région
      </h3>
      <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la création d'une région
      </p>
      <div className="w-full bg-opacity-95 backdrop-blur-sm my-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-6">
            <div className="flex flex-col gap-4">
              {/* ================== USER ================== */}
              <div className="bg-white rounded-lg shadow p-6 ">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <User2 className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Informations de la région:
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                  <Input
                    label="Nom Région:"
                    placeholder="Nom Région"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <div className="w-full">
                    <label className="block text-sm text-gray-500 mb-1">
                      Selectionner la zone:
                    </label>
                  <select
                    {...register("zoneId")}
                    disabled={!!id}
                    className={`
                      w-full text-sm border rounded-md px-3 py-3 focus:outline-none
                      ${id 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200" 
                        : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                      }
                    `}
                  >
                  <option value="">Sélectionner un réseau</option>

                  {reseaux.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} - {r.name}
                    </option>
                  ))}
                </select>
                  </div>


                  <div className="w-full">
                    <label className="block text-sm text-gray-500 mb-1">
                      Selectionner le chef d'agence:
                    </label>
                    <select name="chefAgences" id="chefAgences"
                      {...register("chefAgenceId")}
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option key="value" value="">
                        -- Sélectionner --
                      </option>
                      {chefAgences.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.id} - {user.firstName} {user.lastName}
                        </option>

                      ))}

                    </select>
                    {errors.chefAgenceId && (
                      <p className="text-xs text-red-600 mt-1">{errors.chefAgenceId.message}</p>
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
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>

            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default AgencesCreate