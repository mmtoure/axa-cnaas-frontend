import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reseauSchema } from '../../validations/reseauSchema'

import Input from '../../components/Input'
import { toast } from 'react-toastify'
import { User2 } from 'lucide-react'
import { useEffect } from 'react'
import { getAllUsers } from '../../features/user/userThunk'
import { createReseau } from '../../features/reseau/reseauThunk'

import { MultiSelectDropdown } from '../../components/MultiSelectDropdown'
import { useMemo } from 'react'
import { useState } from 'react'
import { X } from 'lucide-react'
import { getUnassignedRegions } from '../../features/regions/RegionThunk'


const ReseauCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.reseau)
  const { users } = useSelector((state) => state.user)
  const { regions } = useSelector((state) => state.region)
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getUnassignedRegions());
  }, [dispatch])

  const filteredRegions = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return regions;
    return regions.filter((region) =>
      region.name.toLowerCase().includes(query)
    );
  }, [searchText, regions]);

  /* const setRegions = (value) => {
     if (selectedRegions.includes(value)) {
       setSelectedRegions(selectedRegions.filter(region => region !== value));
     } else {
       setSelectedRegions([...selectedRegions, value]);
     }
   }*/

  const chefsReseaux = users.filter(user => user.role.name === "MANAGER") || [];


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(reseauSchema),
    defaultValues: {
      name: "",
      managerId: "",
      regionId: "",
      regionIds: [],
    },
  });

  const selectedRegions = watch("regionIds");

  const toggleRegion = (regionId) => {
    const updated = selectedRegions.includes(regionId)
      ? selectedRegions.filter((id) => id !== regionId)
      : [...selectedRegions, regionId];

    setValue("regionIds", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (data) => {
    console.log("creation reseau", data);
    //dispatch createReseau
    await await dispatch(createReseau(data))
      .unwrap()
      .then(() => {
        toast.success("Réseau créé avec succès");
        navigate("/reseaux");
        reset()
      })
      .catch((err) => {
        console.log("Error creating reseau:", err.error || err.response?.data?.message || err);
        toast.error(err);
      });
  }

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold text-black mb-2">
        Création d'un réseau
      </h3>
      <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la création d'un réseau
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
                    Informations du réseau:
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Nom Réseau:"
                    placeholder="Nom Réseau"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                  <div className="border border-gray-200 rounded-md">

                    <div>
                      <div className="flex flex-wrap gap-1 py-1 px-2 text-sm flex-wrap">


                        {/* Badges sélectionnés */}
                        {selectedRegions.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedRegions.map((id) => {
                              const region = regions.find((r) => r.id === id);

                              return (
                                <span
                                  key={id}
                                  className='bg-gray-200 text-gray-800 py-1 px-2 rounded-md flex items-center gap-1'>
                                  {region?.name}
                                  <X size={12} className="ml-1 cursor-pointer" onClick={() => toggleRegion(id)} />
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Tapez pour filtrer..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full py-2 px-3 outline-none focus:none"
                      />

                    </div>
                    <div className="flex flex-col gap-2 border-t-2 border-gray-400 max-h-48 overflow-y-auto">
                      {
                        filteredRegions?.map(region => (
                          <div key={region.id} className="flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => toggleRegion(region.id)}
                          >
                            <input type="checkbox" className="mr-2" checked={selectedRegions.includes(region.id)} readOnly />
                            {region.name}
                          </div>
                        ))
                      }
                    </div>

                    {errors.regionIds && (
                      <p className="text-xs text-red-600 mt-1">{errors.regionIds.message}</p>
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

export default ReseauCreate