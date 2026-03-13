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
import { me } from '../../features/user/userThunk';


const CreateInsured = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const {loading, success, error} = useSelector((state) => state.insured)
const {user} = useSelector((state)=>state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(insuredSchema),
     defaultValues: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    category: null,
    beneficiary: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
  },
  });


  const onSubmit = async (data) => {
    try {
      console.log("creation assuré",data);
      dispatch(createInsured(data))
      reset();
    } catch (err) {
      alert("Erreur lors de la création", err.message);
    }
  };

useEffect(() => {
  if (success) {
    toast.success("Assuré créé avec succès");
    reset();
    navigate("/insureds");
    dispatch(resetState());
    dispatch(me())
  }

  if (error) {
    toast.error(error);
  }
}, [success, error, dispatch, navigate, reset]);
  return (
 <Dashboard activeMenu="Assurés">
  <div className="bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
    <h3 className="text-2xl font-semibold text-black mb-2">
        Souscription individuelle
    </h3>
    <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la création d'un assuré
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
            Informations Assuré:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {console.log("Current", user)
          }
          {user?.partnerName === "LG" && (
              <div className="w-full">
                  <label className="block text-sm text-gray-500 mb-1">
                      Catégorie
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
            label="Prénom:"
            placeholder="Ibrahima"
            {...register("firstName")}
              error={errors.firstName?.message}
          />

          <Input
            label="Nom:"
            placeholder="Mbaye"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Date de naissance:"
            placeholder="01/01/1980"
            type="date"
             {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
          />

          <Input
            label="Téléphone:"
            placeholder="775505050"
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
            Bénéficiaire <i>en cas de décès</i>:
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Prénom"
            {...register("beneficiary.firstName")}
            error={errors.beneficiary?.firstName?.message}
          />

          <Input
            label="Nom"
            {...register("beneficiary.lastName")}
            error={errors.beneficiary?.lastName?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Date de naissance"
            type="date"
            {...register("beneficiary.dateOfBirth")}
            error={errors.beneficiary?.dateOfBirth?.message}
          />

          <Input
            label="Téléphone"
            {...register("beneficiary.phoneNumber")}
            error={errors.beneficiary?.phoneNumber?.message}
          />
        </div>
      </div>
    </div>
    {/* ================== ACTION ================== */}
    <div className="flex justify-end gap-4">
      <button
        type="button"
        onClick={() => navigate("/insureds")}
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

export default CreateInsured