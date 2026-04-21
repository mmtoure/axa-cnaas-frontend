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
import SearchSelect from '../../components/SearchSelect';
import { useState } from 'react';
import { da, id } from 'zod/locales';
import UploadField from '../../components/UplaodFile';
import { FileText } from 'lucide-react';

const categories = [
  // TELEVISIONS
  { "value": "TVOLED65OLED65C46LA.AFFG", "category": "PREMIUM", id: 1 },
  { "value": "TVOLED55OLED55C46LA.AFFG", "category": "PREMIUM", id: 2 },
  { "value": "TVQNED7575QNED86T6A.AFFG", "category": "PREMIUM", id: 3 },
  { "value": "TVQNED6565QNED82A6A.AFFG", "category": "PREMIUM", id: 4 },
  { "value": "TVUHD8686UT80006LA.AFFG", "category": "CLASSIC", id: 5 },
  { "value": "TVUHD6565UT73006LA.AFFQ", "category": "CLASSIC", id: 6 },
  { "value": "TVUHD5555UT73006LA", "category": "CLASSIC", id: 7 },
  { "value": "TVUHD4343UR73006LA.AFFQ", "category": "CLASSIC", id: 8 },

  // REFRIGERATEURS
  { "value": "REFMoodUp F/D(Instaview)GR-A24F", "category": "PREMIUM", id: 9 },
  { "value": "REFF/D(Instaview)GC-X24FFCAB", "category": "PREMIUM", id: 10 },
  { "value": "REFSxS(Instaview)GC-X257CSEW", "category": "PREMIUM", id: 11 },
  { "value": "REFL&FGC-B414ELFM", "category": "PREMIUM", id: 12 },
  { "value": "REFL&FGC-F411ELDM", "category": "PREMIUM", id: 13 },
  { "value": "REFT/FGR-F882HLHM", "category": "CLASSIC", id: 14 },
  { "value": "REFT/FGN-F452PFAQ", "category": "CLASSIC", id: 15 },
  { "value": "REFT/FGN-B392PXGB", "category": "CLASSIC", id: 16 },
  { "value": "REFB/FGC-F689BLCM", "category": "CLASSIC", id: 17 },
  { "value": "REFB/FGC-B399NLJM", "category": "CLASSIC", id: 18 },
  { "value": "REFFZGCFB145BQCF", "category": "CLASSIC", id: 19 },
  { "value": "REFFZGCFB316BQCF", "category": "STANDARD", id: 20 },

  // LAVE-LINGE (WM)
  { "value": "WMWashTowerWT1310RH", "category": "PREMIUM", id: 21 },
  { "value": "WMFLF0L2CRV2T2", "category": "PREMIUM", id: 22 },
  { "value": "WMFLF0L9DYP2S", "category": "PREMIUM", id: 23 },
  { "value": "WMFLF4V5RGP2T", "category": "CLASSIC", id: 24 },
  { "value": "WMLF2Y1TYP6J", "category": "CLASSIC", id: 25 },
  { "value": "WMLF2Y1HYP6J", "category": "CLASSIC", id: 26 },

  // CLIMATISEURS (RAC)
  { "value": "RACPACAP-Q30GS1K1", "category": "PREMIUM", id: 27 },
  { "value": "RACAir TowerF4NQ25Q2YB0", "category": "PREMIUM", id: 28 },
  { "value": "RACAir TowerF4NQ25N2XA0", "category": "PREMIUM", id: 29 },
  { "value": "RACArt CoolS4-Q12JARTB", "category": "PREMIUM", id: 30 },
  { "value": "RACArt CoolS4-Q18KLRTE", "category": "PREMIUM", id: 31 },
  { "value": "RACMosquito AwayS4-Q18KL28E", "category": "CLASSIC", id: 32 },
  { "value": "RACMosquito AwayS4-Q12JA28J", "category": "CLASSIC", id: 33 },
  { "value": "RACWinnerS4-Q12JAQAL", "category": "CLASSIC", id: 34 }
];


const CreateInsured = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.insured)
  const { user } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    category: null,
  });
  const [file, setFile] = useState(null);

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
      identityCardNumber: null,
      beneficiary: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        phoneNumber: "",
      },
    },
  });


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(
      "insured",
      new Blob([JSON.stringify({
        ...data

      })], { type: "application/json" })
    );


    if (file) {
      formData.append("proofPayment", file);
    }
    try {
      data.category = formData.category;
      dispatch(createInsured(formData))
        .unwrap()
        .then(() => {
          toast.success("Assuré créé avec succès");
          navigate("/insureds");
          reset()
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {
      alert("Erreur lors de la création", err.message);
    }

  };


  return (

    <div className="bg-opacity-95 backdrop-blur-sm p-8 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
      <h3 className="text-2xl font-semibold text-black mb-2">
        Souscription individuelle
      </h3>
      <p className="text-sm text-slate-700 mb-6">
        Entrer les informations pour la création d'un assuré
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={loading} className="space-y-6">

          <div className="flex flex-col gap-4">
            {/* ================== ASSURÉ ================== */}
            <div className="w-full md:w-2/3 bg-opacity-95 backdrop-blur-sm my-4">
              <div className="bg-white rounded-lg shadow p-6 ">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <User2 className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Informations Assuré:
                  </h2>
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
                {user?.partnerName === "LG" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input
                      label="N° CNI:"
                      placeholder="N° de la carte d'identité"
                      {...register("identityCardNumber")}
                      error={errors.identityCardNumber?.message}
                    />
                    <SearchSelect
                      placeholder="Sélectionner un produit"
                      data={categories}
                      onSelect={(category) =>
                        setFormData((prev) => ({ ...prev, category }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>


            <div className="w-full flex gap-2">
              {/* ================== BÉNÉFICIAIRE ================== */}
              <div className="w-2/3 bg-white rounded-lg shadow p-6">
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
              {/* ================== PREUVE DE PAIEMENT ================== */}
              <div className="w-1/3 bg-white rounded-lg shadow p-6">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <FileText className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Preuve de paiement:
                  </h2>
                </div>
                <div>
                  <UploadField
                    key={"paymentProof"}
                    label={"Preuve de paiement (jpg, jpeg, png)"}
                    accept=".jpg,.jpeg,.png"
                    file={file}
                    onChange={(file) =>
                      setFile(file)
                    }
                    error={errors?.documents?.["paymentProof"]?.message}
                  />
                </div>
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


  )
}

export default CreateInsured