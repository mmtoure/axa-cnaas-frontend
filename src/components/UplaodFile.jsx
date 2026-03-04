import { CircleX } from "lucide-react";
import { UploadCloud, FileText, X, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const UploadField = ({ label, accept, file, onChange, error }) => {
  const[ previewUrl, setPreviewUrl] = useState(null)
  const[errors, setErrors] = useState([]);
  const handleFile = (f) => {
    if (!f) {
    
      return;
    }

    if (f.size > MAX_SIZE) {
      setErrors.push("Fichier trop volumineux (max 5MB)")
      alert("Fichier trop volumineux (max 5MB)");
      setPreviewUrl(null);
      return;
    }

    onChange(f);
    setPreviewUrl(URL.createObjectURL(f))
  };

  const isImage = file?.type?.startsWith("image");
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>

   

      {/* Preview */}
      {file? (

        <div className="relative flex items-center justify-between bg-gray-100 p-2 mt-2 rounded">
         
            {isImage ? 
                (
                    <img src={previewUrl} alt="Preview" />

                ):(
                    <iframe
                        src={previewUrl}
                        title="PDF Preview"
                        width="100%"
                        style={{ border: "none" }}
                    />
                )
            }
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute text-red-500 hover:text-red-700 cursor-pointer top-0 right-0"
          >
            <CircleX size={24} />
          </button>
        </div>
      ):(<div className="text-sm text-gray-500">
           {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition
          ${error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"}
        `}
        onClick={() => document.getElementById(label)?.click()}
      >
        <UploadCloud className="mx-auto mb-2 text-gray-400" size={30} />
        <p className="text-sm text-gray-500">
          Glissez ou cliquez pour sélectionner un fichier
        </p>
        <p className="text-xs text-gray-400 mt-1">{accept}</p>

        <input
          id={label}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      </div>)}

      {/* Error */}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default UploadField;