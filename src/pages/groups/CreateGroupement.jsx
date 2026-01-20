import React from 'react'
import Dashboard from '../../components/Dashboard'
import { useState } from 'react'
import { useEffect } from 'react';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { User2 } from 'lucide-react';
import { createGroup } from '../../features/group/groupThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../features/group/groupSlice';
import { toast } from 'react-toastify';
import * as XLSX from "xlsx";
import { cleanRow, validateRow } from '../../util/excelUtils';
import { LoaderCircle } from 'lucide-react';



const CreateGroupement = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, success, error } = useSelector((state) => state.group)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null); 
  const[errorExcel, setErrorExcel] = useState([])
  
  
  const onSubmit = async (data) => {
    console.log("DATA", data);
    const validationErrors = [];

    if (!file.name.match(/\.(xls|xlsx)$/)) {
    setErrorExcel(["Format de fichier invalide (.xls ou .xlsx requis)"]);
    return;
    }
      
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, {defval: "", raw: false});

    
    

    const cleaned = [];
  

    rows.forEach((row, index) => {
      
      const clean = cleanRow(row);
      const error = validateRow(clean, index);

      if (error) validationErrors.push(error);
       else cleaned.push(clean);
    });

    if (validationErrors.length) {
      setErrorExcel(validationErrors);
      return;
    }
    

    const formData = new FormData();

    formData.append(
      "group",
      new Blob([JSON.stringify({
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      })], { type: "application/json" })
    );

    formData.append("file", file);

    try {
      console.log("creation assuré", data);
      dispatch(createGroup(formData))
    
    } catch (err) {
      alert("Erreur lors de la création", err.message);
    }

  };


  useEffect(() => {
    if (success) {
      toast.success("Groupement créé avec succès");
      navigate("/groups");
      dispatch(resetState());
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch, navigate]);


  return (
    <Dashboard activeMenu="Groupements">

      <div className="bg-opacity-95 backdrop-blur-sm p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black mb-2">
          Création d'un groupement
        </h3>
        <p className="text-sm text-slate-700 mb-6">
          Entrer les informations pour la création d'un groupement
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset disabled={loading} className="space-y-6">
            <div className="flex flex-col gap-4">


              {/* ================== ASSURÉ ================== */}
              <div className="bg-white rounded-lg shadow p-6 ">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <User2 className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Informations du groupement:
                  </h2>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                     <Input
                      label="Nom Groupement:"
                      placeholder="Nom Groupement:"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                    <Input
                      label="Téléphone:"
                      placeholder="Téléphone"
                      {...register("phoneNumber")}
                      error={errors.phoneNumber?.message}
                    />
                 </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Prénom Représentant:"
                    placeholder="Prénom du représentant"
                    {...register("firstName")}
                    error={errors.firstName?.message}
                  />

                  <Input
                    label="Nom Représentant:"
                    placeholder="Nom du représentant"
                    {...register("lastName")}
                    error={errors.lastName?.message}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Date de naissance Représentant:"
                    placeholder="Date de naissance"
                    type="date"
                    {...register("dateOfBirth")}
                    error={errors.dateOfBirth?.message}
                  />
                </div>
              </div>

              {/* ================== BÉNÉFICIAIRE ================== */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-200'>
                  <User2 className='w-4 h-4' />
                  <h2 className="text-gray-500 text-lg font-semibold">
                    Groupement
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) {
                        setFile(selectedFile); // 🔐 fichier sécurisé
                      }
                    }}
                    error={errors.file?.message}
                  />

                {errorExcel.length > 0 && (
                  <div className="bg-red-50 p-2 text-red-700 text-sm">
                    <h4>Erreurs Excel :</h4>
                    {errorExcel.map((e, i) => (
                      <p key={i}>
                        Ligne {e.line} : {e}
                      </p>
                    ))}
                  </div>
                )}
                </div>
              </div>
        
            </div>
            {/* ================== ACTION ================== */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/groups")}
                className="px-6 py-2 bg-gray-500 text-white rounded"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-700 text-white rounded disabled:opacity-50">
                  {loading ? (
                      <>
                          <LoaderCircle className="animate-spin mr-2 inline-block" size={20} />
                          Enregistrement...
                      </>
                      ):("Enregistrer")}
              </button>
            </div>
          </fieldset>
        </form>
      </div>

    </Dashboard>
  )
}

export default CreateGroupement