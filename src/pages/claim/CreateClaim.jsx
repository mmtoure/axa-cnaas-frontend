import React from 'react'
import Dashboard from '../../components/Dashboard'
import Input from '../../components/Input';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetState } from '../../features/insured/insuredSlice';
import { toast } from 'react-toastify';
import { createClaim } from '../../features/claim/claimThunk';
import { claimSchema } from '../../validations/claimSchema';
import { useParams } from 'react-router-dom';


const CreateClaim = () => {

  const {insuredId} = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.claim)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      sinisterType: "",
      hospitalizationStartDate: "",
      hospitalizationEndDate: "",
      cause: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
      formData.append(
      "claim",
      new Blob([JSON.stringify({
        sinisterType: data.sinisterType,
        cause: data.cause,
        hospitalizationStartDate: data.hospitalizationStartDate,
        hospitalizationEndDate: data.hospitalizationEndDate,
        insuredId: parseInt(insuredId),
      })], { type: "application/json" })
    );

      console.log("DATA", data);
 
    if (data.file && data.file.length > 0) {  
      formData.append("file", data.file[0]);
    }
    dispatch(createClaim(formData));
  };

  useEffect(() => {
   
    if (success) {
      toast.success("Sinistre créé avec succès");
      reset();
      navigate("/claims");
      dispatch(resetState());
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate, reset]);
  return (
    <Dashboard activeMenu="Sinistres">
      <div className="bg-opacity-95 backdrop-blur-sm p-8 rounded-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black mb-2">
          Déclaration de sinistre
        </h3>
        <p className="text-sm text-slate-700 mb-6">
          Entrer les informations pour la création d'un sinistre
        </p>


        <div className="w-full md:w-2/3 bg-opacity-95 backdrop-blur-sm my-4">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <fieldset disabled={loading} className="space-y-6">
              <div className="flex flex-col gap-4">

                {/* ================== INFORMATION SINISTRE ================== */}
                <div className="bg-white rounded-lg shadow p-6 ">
                  <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                    <User2 className='w-4 h-4' />
                    <h2 className="text-gray-500 text-lg font-semibold">
                      Informations Sinistre:
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="w-full">
                      <label className="block text-sm text-gray-500 mb-1">
                        Nature du sinistre
                      </label>
                      <select
                        {...register("sinisterType")}
                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-3
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- Sélectionner --</option>
                        <option value="HOSPICASH">Hospicash</option>
                        <option value="INVALIDITE">Invalidité</option>
                        <option value="CAPITAL_FUNERAIRE">Capital Funéraire</option>
                      </select>
                      {errors.sinisterType && (
                        <p className="text-xs text-red-600 mt-1">{errors.sinisterType.message}</p>
                      )}
                    </div>

                    <Input
                      label="Cause du sinistre:"
                      placeholder="Cause du sinistre"
                      {...register("cause")}
                      error={errors.cause?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">


                    <Input
                      label="Date de début d'hospitalisation:"
                      placeholder="Date de début d'hospitalisation"
                      type="date"
                      {...register("hospitalizationStartDate")}
                      error={errors.hospitalizationStartDate?.message}
                    />
                    <Input
                      label="Date de fin d'hospitalisation:"
                      placeholder="Date de fin d'hospitalisation"
                      type="date"
                      {...register("hospitalizationEndDate")}
                      error={errors.hospitalizationEndDate?.message}
                    />
                  </div>
                </div>
              </div>
              {/* ================== BÉNÉFICIAIRE ================== */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <User2 className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Upload des documents:
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                </div>
              </div>
              {/* ================== ACTION ================== */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/claims")}
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

export default CreateClaim