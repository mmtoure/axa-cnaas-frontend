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
import { partnerSchema } from '../../validations/partnerSchema';
import { createPartner } from '../../features/partner/partnerThunk';
import { useState } from 'react';
import UploadField from '../../components/UplaodFile';


const CreatePartner = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.partner)
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: "",
      code: "",
      phoneNumber: "",
      email: ""
    },
  });



  const onSubmit = async (data) => {
    console.log("creation partenaire", data);

    const formData = new FormData();
    formData.append(
      "partner",
      new Blob([JSON.stringify({
        ...data
    
      })], { type: "application/json" })
    );
    if (file) {
      formData.append("logoPartner", file);
    }
    
   dispatch(createPartner(formData))
      .unwrap()
      .then(() => {
        toast.success("Partenaire créé avec succès");
        navigate("/partners");
        reset()
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };


  return (
    <Dashboard activeMenu="Assurés">
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
                      Informations Assuré:
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <UploadField
                      key={"partnerLogo"}
                      label={"Logo du partenaire"}
                      accept=".jpg,.jpeg,.png"
                      file={file}
                      onChange={(file) =>
                        setFile(file)
                      }
                      error={errors?.documents?.["partnerLogo"]?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label="Nom:"
                      placeholder="Nom partenaire"
                      {...register("name")}
                      error={errors.name?.message}
                    />

                    <Input
                      label="Code:"
                      placeholder="Code"
                      {...register("code")}
                      error={errors.code?.message}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                    <Input
                      label="Email:"
                      placeholder="Adresse email"
                      {...register("email")}
                      error={errors.email?.message}
                    />

                    <Input
                      label="Téléphone:"
                      placeholder="Téléphone partenaire"
                      {...register("phoneNumber")}
                      error={errors.phoneNumber?.message}
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
    </Dashboard>
  )
}
export default CreatePartner;