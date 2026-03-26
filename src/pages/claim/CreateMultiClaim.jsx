import React from 'react'
import Dashboard from '../../components/Dashboard'
import Input from '../../components/Input';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { resetState } from '../../features/insured/insuredSlice';
import { toast } from 'react-toastify';
import { createAllclaims } from '../../features/claim/claimThunk';
import { useParams } from 'react-router-dom';
import { Folder } from 'lucide-react';
import { useState } from 'react';
import { HeartPulse } from 'lucide-react';
import { AlertTriangle } from 'lucide-react';
import { FileText } from 'lucide-react';
import { createClaimsSchema } from '../../validations/createClaimSchema';
import UploadField from '../../components/UplaodFile';
const REQUIRED_DOCUMENTS = {
  HOSPICASH: [
    { key: "PIECE_IDENTITE_HOSPICASH", label: "Pièce d’identité hospicash" },
    { key: "DECHARGE_HOSPITALISATION", label: "Decharge d’hospitalisation" },
  ],
  INVALIDITE: [
    { key: "PIECE_IDENTITE_INVALIDITE", label: "Pièce d’identité invalidite" },
    { key: "CERTIFICAT_INVALIDITE", label: "Certificat d’invalidité" },
  ],
  CAPITAL_FUNERAIRE: [
    { key: "PIECE_IDENTITE_FUNERAIRE", label: "Pièce d’identité funéraire" },
    { key: "CERTIFICAT_DECES", label: "Certificat de décès" },
  ],
};
const CLAIM_TYPES = ["HOSPICASH", "INVALIDITE", "CAPITAL_FUNERAIRE"];


const CreateMultiClaim = () => {

  const { insuredId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.claim)
  const [files, setFiles] = useState({});
  const [ErrorFiles, setErrorFile] = useState([])

  const [selectedClaims, setSelectedClaims] = useState([]);



  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createClaimsSchema),
    defaultValues: { claims: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "claims",
  });

  const toggleClaim = (type, checked) => {
    const index = fields.findIndex((f) => f.type === type);

    if (checked && index === -1) {
      append({ type, enabled: true });
    }

    if (!checked && index !== -1) {
      remove(index);
    }
  };


  const onSubmit = async (data) => {
    console.log("CLAIMS", data);
    console.log("FILES", files);

    const formData = new FormData();
    formData.append(
      "claims",
      new Blob(
        [
          JSON.stringify({
            claims: data.claims,
            insuredId: parseInt(insuredId),
          }),
        ],
        { type: "application/json" }
      )
    );
    const missing = [];

    selectedClaims.forEach((type) => {
      REQUIRED_DOCUMENTS[type].forEach((doc) => {
        if (!files?.[type]?.[doc.key]) {
          missing.push(`${type} - ${doc.label}`);
        }
      });
    });
    if (missing.length > 0) {
      setErrorFile(missing);
      return;
    }

      Object.entries(files).forEach(([claimType, docs]) => {
    Object.entries(docs).forEach(([docType, file]) => {
      formData.append("files", file);
      formData.append("claimTypes", claimType);
      formData.append("documentTypes", docType);
    });
  });

  dispatch(createAllclaims(formData))
  .unwrap()
  .then(() => {
    toast.success("Sinistre créé avec succès");
    navigate(`/insureds/${insuredId}`, { replace: true });
  })
  .catch((err) => {
    toast.error(err.message);
  });

  };

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
                  {/* CHECKBOXES */}
                  <div className='flex items-center justify-content gap-3'>
                    {CLAIM_TYPES.map((type) => (
                      <label key={type} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          value={type}
                          checked={selectedClaims.includes(type)}
                          onChange={(e) =>
                            setSelectedClaims((prev) =>
                              e.target.checked
                                ? [...prev, type]
                                : prev.filter((t) => t !== type)
                            )
                          }
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                  {/* FORMS PAR TYPE */}


                  {selectedClaims.map((claimType, index) => {
                    return (
                      <div key={claimType} className="mt-4">

                        {/* TYPE caché */}
                        <input
                          type="hidden"
                          value={claimType}
                          {...register(`claims.${index}.sinisterType`)}
                        />



                        {claimType === "HOSPICASH" && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                            <Input
                              label="Date début hospitalisation"
                              type="date"
                              {...register(`claims.${index}.hospitalizationStartDate`)}
                              error={
                                errors?.claims?.[index]?.hospitalizationStartDate?.message
                              }
                            />

                            <Input
                              label="Date fin hospitalisation"
                              type="date"
                              {...register(`claims.${index}.hospitalizationEndDate`)}
                              error={
                                errors?.claims?.[index]?.hospitalizationEndDate?.message
                              }
                            />

                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* ERREUR GLOBALE */}
                  {errors.claims?.message && (
                    <p className="text-red-600 mt-2">{errors.claims.message}</p>
                  )}
                </div>

                {/* ================== DOCUMENTS ================== */}
                <div className="bg-white rounded-lg shadow p-4 ">
                  <div className='flex items-center gap-2 pb-2 border-b border-gray-200'>
                    <Folder className='w-4 h-4' />
                    <h2 className="text-gray-500 text-lg font-semibold">
                      Documents obligatoires:
                    </h2>
                  </div>
                  {/* DOCUMENTS */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">
                      Documents obligatoires
                    </p>
                     
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
                    {selectedClaims.map((claimType) => (
                      <div key={claimType} className="border border-gray-300 p-3 rounded-md mt-3">
                        <h4 className="font-semibold">{claimType}</h4>
                        {REQUIRED_DOCUMENTS[claimType].map((doc) => (
                          <UploadField
                            key={`${claimType}-${doc.key}`}
                            label={doc.label}
                            accept=".pdf,.jpg,.jpeg,.png"
                            file={files?.[claimType]?.[doc.key]}
                            onChange={(file) =>
                              setFiles((prev) => ({
                                ...prev,
                                [claimType]: {
                                  ...prev[claimType],
                                  [doc.key]: file,
                                },
                              }))
                            }
                            error={ErrorFiles.includes(`${claimType} - ${doc.label}`)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ================== ACTION ================== */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/sinistres")}
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
              </div>

            </fieldset>
          </form>
        </div>
      </div>
  
  );
}
export default CreateMultiClaim