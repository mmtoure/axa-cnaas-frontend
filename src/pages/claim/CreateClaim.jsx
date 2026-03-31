import React from 'react'
import Dashboard from '../../components/Dashboard'
import Input from '../../components/Input';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetState } from '../../features/insured/insuredSlice';
import { toast } from 'react-toastify';
import { createClaim } from '../../features/claim/claimThunk';
import { claimSchema } from '../../validations/claimSchema';
import { useParams } from 'react-router-dom';
import { Folder } from 'lucide-react';
import UploadField from '../../components/UplaodFile';
import { useState } from 'react';

const REQUIRED_DOCS = {
   HOSPICASH: [
    { key: "PIECE_IDENTITE_RECTO_HOSPICASH", label: "Pièce d’identité recto hospicash" },
    { key: "PIECE_IDENTITE_VERSO_HOSPICASH", label: "Pièce d’identité verso hospicash" },
    { key: "DECHARGE_HOSPITALISATION", label: "Decharge d’hospitalisation" },
  ],
  INVALIDITE: [
    { key: "PIECE_IDENTITE_RECTO_INVALIDITE", label: "Pièce d’identité recto invalidite" },
    { key: "PIECE_IDENTITE_VERSO_INVALIDITE", label: "Pièce d’identité verso invalidite" },
    { key: "CERTIFICAT_INVALIDITE", label: "Certificat d’invalidité" },
  ],
  CAPITAL_FUNERAIRE: [
    { key: "PIECE_IDENTITE_RECTO_FUNERAIRE", label: "Pièce d’identité recto funéraire" },
    { key: "PIECE_IDENTITE_VERSO_FUNERAIRE", label: "Pièce d’identité verso funéraire" },
    { key: "CERTIFICAT_DECES", label: "Certificat de décès" },
  ],
};


const CreateClaim = () => {

  const { insuredId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.claim)
  const [files, setFiles] = useState({});
  const [ErrorFiles, setErrorFile] =useState([])
  const [previewUrl, setPreviewUrl] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      sinisterType: "",
      hospitalizationStartDate: "",
      hospitalizationEndDate: "",
      motif: "",
      compensationAmount: "",
    },
  });
  const sinisterType = watch("sinisterType");
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(
      "claim",
      new Blob([JSON.stringify({
        ...data,
        insuredId: parseInt(insuredId),
    
      })], { type: "application/json" })
    );

    const missingsDoc = REQUIRED_DOCS[sinisterType]
    .filter((doc) => !files[doc.key])
    .map((doc)=>doc.label)
    if(missingsDoc.length>0){
      setErrorFile(missingsDoc)
     return ;
    }
    

    Object.entries(files).forEach(([key, file]) => {
      formData.append("files", file);
      formData.append("documentTypes", key);
    });
    
    dispatch(createClaim(formData));
  };

  useEffect(() => {

    if (success) {
      toast.success("Sinistre créé avec succès");
      reset();
      navigate({ pathname: `/insureds/${insuredId}` });
      dispatch(resetState());
    }

    if (error) {
      
      toast.error(error);
    }
  }, [success, error, dispatch, navigate, reset, insuredId]);
  return (
 
      <div className="bg-opacity-95 backdrop-blur-sm p-4 rounded-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black mb-2">
          Déclaration de sinistre
        </h3>
        <p className="text-sm text-slate-700 mb-3">
          Entrer les informations pour la création d'un sinistre
        </p>


        <div className="w-full md:w-3/4 bg-opacity-95 backdrop-blur-sm my-2">

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={loading} className="space-y-3">
              <div className="flex flex-col gap-2">
              {/* ================== INFORMATION SINISTRE ================== */}
              <div className="bg-white rounded-lg shadow p-4 ">
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
                </div>
                {sinisterType === "HOSPICASH" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Motif d'hospitalisation:"
                    placeholder="Motif"
                    {...register("motif")}
                    error={errors.motif?.message}
                  />

                    <Input
                      label="Date début hospitalisation"
                      type="date"
                      {...register("hospitalizationStartDate")}
                      error={errors.hospitalizationStartDate?.message}
                    />

                    <Input
                      label="Date fin hospitalisation"
                      type="date"
                      {...register("hospitalizationEndDate")}
                      error={errors.hospitalizationEndDate?.message}
                    />
                  </div>
                )}

                {sinisterType === "INVALIDITE" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                  <Input
                    label="Motif d'invalidité:"
                    placeholder="Motif d'invalidité"
                    {...register("motif")}
                    error={errors.motif?.message}
                  />

                    <Input
                      label="Montant d'indemnisation (CFA)"
                      type="number"
                      {...register("compensationAmount", { valueAsNumber: true })}
                      error={errors.compensationAmount?.message}
                    />

                  </div>
                )}

                {sinisterType === "CAPITAL_FUNERAIRE" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                     <Input
                    label="Motif du décès:"
                    placeholder="Motif du décès"
                    {...register("motif")}
                    error={errors.motif?.message}
                    />
                    
                  </div>

                    )}
              </div>
              </div>
              {/* ================== DOCUMENTS ================== */}
              <div className="bg-white rounded-lg shadow p-4 ">
                <div className='flex items-center gap-2 pb-2 border-b border-gray-200'>
                  <Folder className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Documents obligatoires:
                  </h2>
                </div>
              
                
                {sinisterType && (
                    <div className="bg-white rounded-xl p-6 mt-4">
                      {ErrorFiles.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                          
                          <div className="flex items-center gap-2 mb-2 font-semibold">
                            <span className="text-lg">⚠️</span>
                            <span>
                              Documents obligatoires manquants ({ErrorFiles.length})
                            </span>
                          </div>

                          <ul className="list-disc ml-6 space-y-1">
                            {ErrorFiles.map((doc, index) => (
                              <li key={doc}>
                                {doc}
                                <span className="text-red-500">*</span>
                              </li>
                            ))}
                          </ul>

                          <p className="text-xs text-red-500 mt-2">
                            * Veuillez téléverser tous les documents requis pour continuer.
                          </p>
                          
                          
                        </div>
                      )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {REQUIRED_DOCS[sinisterType]?.map((doc) => (
                              <UploadField
                                key={doc.key}
                                label={doc.label}
                                accept=".pdf,.jpg,.jpeg,.png"
                                file={files[doc.key]}
                                onChange={(file) =>
                                  setFiles((prev) => ({ ...prev, [doc.key]: file }))
                                }
                                error={errors?.documents?.[doc.key]?.message}
                              />
                            ))}
                        </div>
                      </div>
                    )}
              </div>
              {/* ================== ACTION ================== */}
              <div className="flex justify-end gap-2">
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
   
  )
}

export default CreateClaim