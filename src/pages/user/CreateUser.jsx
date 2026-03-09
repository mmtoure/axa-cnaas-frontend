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
import { use } from 'react';
import { getAllPartners } from '../../features/partner/partnerThunk';

const CreateUser = () => {
    const navigate = useNavigate();
  const {loading, success, error} = useSelector((state) => state.user)
  const {partners} = useSelector((state)=>state.partner)
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            partnerId: "",
            roleName: ""


        },
    });

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
        <Dashboard activeMenu="Utilisateurs">
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


                                {/* ================== ASSURÉ ================== */}
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
                                        <div className="w-full">
                                            <label className="block text-sm text-gray-500 mb-1">
                                                PARTENAIRE:
                                            </label>
                                            <select name="partners" id="partners"
                                                {...register("partnerId")}
                                                className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                {partners.map((partner) => (
                                                    <option key={partner.id} value={partner.id}>{partner.name}</option>
                                                ))}
                                            </select>
                                            {errors.partnerId && (
                                                <p className="text-xs text-red-600 mt-1">{errors.partnerId.message}</p>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <label className="block text-sm text-gray-500 mb-1">
                                                ROLE:
                                            </label>
                                            <select name="roleName" id="roleName"
                                                {...register("roleName")}
                                                className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">-- Sélectionner --</option>
                                                <option value="MANAGER">Manager</option>
                                                <option value="USER">User</option>
                                            </select>
                                            {errors.roleName && (
                                                <p className="text-xs text-red-600 mt-1">{errors.roleName.message}</p>
                                            )}
                                        </div>
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
        </Dashboard>
    )
}

export default CreateUser