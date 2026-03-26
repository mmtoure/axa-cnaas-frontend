import React from 'react'
import Dashboard from '../../components/Dashboard'
import Input from '../../components/Input';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getPartnerById } from '../../features/partner/partnerThunk';
import { partnerPricingSchema } from '../../validations/partnerPricingSchema';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createPricing } from '../../features/partnerPricing/partnerPricingThunk';


const CreatePricings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    const { loading, success, error } = useSelector((state) => state.pricing)
    const { partner } = useSelector((state) => state.partner)



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(partnerPricingSchema),
     
    });



    const onSubmit = async (data) => {
        console.log("creation pricing", data);
        console.log(id);
        

        dispatch(createPricing({
            ...data,
            partnerId: parseInt(id)
        }))
         .unwrap()
            .then(() => {
                toast.success("Partenaire créé avec succès");
                navigate(`/partners/${id}`);
                reset()
            })
            .catch((err) => {
                toast.error(err.message);
            });

    };

    useEffect(() => {


        dispatch(getPartnerById(id))

    }, [dispatch, id])


    return (
    
            <div className="bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-semibold text-black mb-2">
                    Création d'un partenaire
                </h3>
                <p className="text-sm text-slate-700 mb-6">
                    Entrer les informations pour la création d'un partenaire
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
                                            Pricings Info:
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                                        {partner?.code === "LG" && (
                                            <div className="w-full">
                                                <label className="block text-sm text-gray-500 mb-1">
                                                    Prime
                                                </label>
                                                <select
                                                    {...register("category")}
                                                    className="w-full text-sm border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">-- Sélectionner --</option>
                                                    <option value="STANDARD">Standard</option>
                                                    <option value="CLASSIC">Classic</option>
                                                    <option value="PREMIUM">Premium</option>
                                                </select>
                                                {errors.sinisterType && (
                                                    <p className="text-xs text-red-600 mt-1">{errors.category.message}</p>
                                                )}
                                            </div>
                                        )}
                                    
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                                        <Input
                                            label="Montant prime:"
                                            type="numeric"
                                            placeholder="Montant de la prime"
                                            {...register("montantPrime", { valueAsNumber: true })}
                                            error={errors.montantPrime?.message}
                                        />

                                        <Input
                                            label="Capital Max:"
                                            placeholder="Capital MAX"
                                            {...register("capitalMAX", { valueAsNumber: true })}
                                            error={errors.capitalMAX?.message}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                                        <Input
                                            label="plafondNuitsParAn:"
                                            placeholder="plafondNuitsParAn"
                                            {...register("plafondNuitsParAn", { valueAsNumber: true })}
                                            error={errors.plafondNuitsParAn?.message}
                                        />
                                        <Input
                                            label="Montant nuit hospitalisation:"
                                            placeholder="Montant nuit"
                                            {...register("montantParNuit", { valueAsNumber: true })}
                                            error={errors.montantParNuit?.message}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                                        <Input
                                            label="accessoryCost:"
                                            placeholder="accessoryCost"
                                            {...register("accessoryCost", { valueAsNumber: true })}
                                            error={errors.accessoryCost?.message}
                                        />

                                        <Input
                                            label="Taxe:"
                                            placeholder="Taxe"
                                            {...register("tax", { valueAsNumber: true })}
                                            error={errors.tax?.message}
                                        />


                                    </div>
                                </div>
                            </div>
                            {/* ================== ACTION ================== */}
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/partenaires")}
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


export default CreatePricings