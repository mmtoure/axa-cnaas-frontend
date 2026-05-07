import React from 'react'
import Dashboard from '../../components/Dashboard'
import { get, useForm } from 'react-hook-form'
import { userSchema } from '../../validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { User2 } from 'lucide-react';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/user/userThunk';
import { toast } from 'react-toastify';
import { getAllPartners } from '../../features/partner/partnerThunk';
import { selectCurrentUser } from '../../features/auth/authSelectors';
import { getAvailableNetwork } from '../../features/reseau/reseauThunk';
import { useMemo } from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { getAvailableRegions } from '../../features/regions/RegionThunk';

const CreateUser = () => {
    const navigate = useNavigate();
    const { loading, success, error } = useSelector((state) => state.user)
    const { partners } = useSelector((state) => state.partner)
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const { reseaux } = useSelector((state) => state.reseau)
    const [searchText, setSearchText] = useState("");
    const { regions } = useSelector((state) => state.region)
    const networkId = currentUser?.network?.id;
    console.log("networkId for currentUser", currentUser?.network?.id);




    useEffect(() => {
        dispatch(getAvailableNetwork());
    }, [dispatch]);

    useEffect(() => {
        if (networkId) {
            dispatch(getAvailableRegions(networkId));
        }
    }, [dispatch, networkId]);

    const filteredRegions = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        if (!query) return regions;
        return regions.filter((region) =>
            region.name.toLowerCase().includes(query)
        );
    }, [searchText, regions]);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            partnerId: "",
            roleName: "",
            zoneId: null,
            agenceId: null,
            networkId: "",
            regionIds: [],
        },
    });
    const selectedRole = watch("roleName");
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

    useEffect(() => {
        dispatch(getAllPartners());
    }, [dispatch]);

    const onSubmit = (data) => {
        console.log("USER DATA", data);
        dispatch(createUser(data))
            .unwrap()
            .then(() => {
                toast.success("Utilisateur créé avec succès");
                navigate('/users', { replace: true });
            })
            .catch((err) => {
                toast.error(err.message);
            });

    }

    return (

        <div className="p-5">
            <h3 className="text-2xl font-semibold text-black mb-2">
                Création d'un utilsateur
            </h3>
            <p className="text-sm text-slate-700 mb-6">
                Entrer les informations pour la création d'un utlisateur
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
                                        Informations Utilisateur:
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Input
                                        label="Prénom:"
                                        placeholder="Prénom utilisateur"
                                        {...register("firstName")}
                                        error={errors.firstName?.message}
                                    />
                                    <Input
                                        label="Nom:"
                                        placeholder="Nom utlisateur"
                                        {...register("lastName")}
                                        error={errors.lastName?.message}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Input
                                        label="Téléphone:"
                                        placeholder="Téléphone"
                                        {...register("phoneNumber")}
                                        error={errors.phoneNumber?.message}
                                    />
                                    <Input
                                        label="email:"
                                        placeholder="Adresse email"
                                        {...register("email")}
                                        error={errors.email?.message}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    {currentUser?.role?.name === "SUPER_ADMIN" && (
                                        <div className="w-full">
                                            <label className="block text-sm text-gray-500 mb-1">
                                                PARTENAIRE:
                                            </label>
                                            <select name="partners" id="partners"
                                                {...register("partnerId")}
                                                className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {currentUser?.role.name === "SUPER_ADMIN" && partners.map((partner) => (
                                                    <>

                                                        <option key={partner.id} value={partner.id}>
                                                            {partner.name}
                                                        </option>
                                                    </>
                                                ))}

                                            </select>
                                            {errors.partnerId && (
                                                <p className="text-xs text-red-600 mt-1">{errors.partnerId.message}</p>
                                            )}
                                        </div>
                                    )}
                                    <div className="w-full">
                                        <label className="block text-sm text-gray-500 mb-1">
                                            ROLE:
                                        </label>
                                        <select name="roleName" id="roleName"
                                            {...register("roleName")}
                                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">-- Sélectionner --</option>
                                            {errors.roleName && (
                                                <p className="text-xs text-red-600 mt-1">{errors.roleName.message}</p>
                                            )}
                                            {currentUser?.role?.name === "SUPER_ADMIN" && (
                                                <>
                                                    <option value="ADMIN">Admin</option>
                                                    <option value="MANAGER">Manager</option>
                                                    <option value="USER">User</option>
                                                </>

                                            )}

                                            {currentUser?.role?.name === "ADMIN" && (
                                                <>
                                                    <option value="MANAGER">Manager</option>
                                                    <option value="USER">User</option>
                                                </>

                                            )}

                                            {currentUser?.role?.name === "MANAGER" && (
                                                <>
                                                    <option value="USER">User</option>
                                                </>

                                            )}


                                        </select>
                                        {errors.roleName && (
                                            <p className="text-xs text-red-600 mt-1">{errors.roleName.message}</p>
                                        )}
                                    </div>

                                    {selectedRole === "MANAGER" && (
                                        <div className="w-full">
                                            <label className="block text-sm text-gray-500 mb-1">
                                                RÉSEAU:
                                            </label>
                                            <select name="networkId" id="networkId"
                                                {...register("networkId")}
                                                className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {reseaux.map((reseau) => (
                                                    <option key={reseau.id} value={reseau.id}>
                                                        {reseau?.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.networkId && (
                                                <p className="text-xs text-red-600 mt-1">{errors.networkId.message}</p>
                                            )}
                                        </div>
                                    )}

                                    {selectedRole === "USER" && (
                                        <div className="">
                                            <label className="block text-sm text-gray-500 mb-1">
                                                RÉGIONS:
                                            </label>
                                            <div className="border border-gray-200 rounded-md">
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
                                                    filteredRegions.map(region => (
                                                        <div key={region.id} className="flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => toggleRegion(region.id)}
                                                        >
                                                            <input type="checkbox" className="mr-2" checked={selectedRegions.includes(region.id)} readOnly />
                                                            {region?.name}
                                                        </div>
                                                    ))
                                                }
                                            </div>

                                            {errors.regionIds && (
                                                <p className="text-xs text-red-600 mt-1">{errors.regionIds.message}</p>
                                            )}
                                        </div>


                                    )}

                                </div>
                            </div>
                        </div>
                        {/* ================== ACTION ================== */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/users")}
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

export default CreateUser