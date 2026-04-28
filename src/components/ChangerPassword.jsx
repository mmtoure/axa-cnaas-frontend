import React from 'react'
import { useEffect } from 'react';
import { userSchema } from '../validations/userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { User2 } from 'lucide-react';
import Input from './Input';
import { changepasswordSchema } from '../validations/changepassword';
import { changePassword } from '../features/auth/authThunk';




const ChangerPassword = () => {
    const {id}= useParams();
 const navigate = useNavigate();
    const { loading, success, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(changepasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data) => {
       
        data = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }
         console.log("USER DATA", data);
         console.log("USER ID",parseInt(id));

        dispatch(changePassword({id: parseInt(id), ...data}))
            .unwrap()
            .then(() => {
                toast.success("Mot de passe changé avec succès");
                navigate("/users");
                reset();
            })
            .catch((err) => {
                toast.error(err.message);
                toast.error("Erreur lors du changement de mot de passe");
            });
     
    }



    return (

        <div className="p-5">
            <h3 className="text-2xl font-semibold text-black mb-2">
                Changement de mot de passe
            </h3>
            <p className="text-sm text-slate-700 mb-6">
                Entrer les informations pour le changement de mot de passe
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
                                        Changer votre mot de passe:
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                                    <Input
                                        label="Ancien mot de passe:"
                                        placeholder="Ancien mot de passe"
                                        type="password"
                                        {...register("oldPassword")}
                                        error={errors.oldPassword?.message}
                                    />
                                    <Input
                                        label="Nouveau mot de passe:"
                                        placeholder="Nouveau mot de passe"
                                        type="password"
                                        {...register("newPassword")}
                                        error={errors.newPassword?.message}
                                    />
                              
                                    <Input
                                        label="Confirmer le nouveau mot de passe:"
                                        placeholder="Confirmer le nouveau mot de passe"
                                        type="password"
                                        {...register("confirmPassword")}
                                        error={errors.confirmPassword?.message}
                                    />
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

export default ChangerPassword