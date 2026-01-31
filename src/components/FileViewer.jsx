import { FileText, Image as ImageIcon, Download, Eye } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getDocumentClaimById } from "../features/claimDocument/claimDocumentThunk";

const FileViewer = ({ fileUrl, label, fileName, id }) => {

    const dispatch = useDispatch();
    const {claimDocument, loading, success, error} = useSelector((state)=>state.claimDocument)

    useEffect(()=>{
        dispatch(getDocumentClaimById(id))
    },[dispatch,id])

  if (!fileUrl) {
    return (
      <div className="text-sm text-gray-400 italic">
        Aucun fichier fourni
      </div>
    );
  }
  //console.log("DOC", claimDocument);
  

  const extension = fileName?.split(".").pop()?.toLowerCase();

  const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(extension);
  const isPdf = extension === "pdf";

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-2">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isImage ? (
            <ImageIcon className="w-5 h-5 text-blue-600" />
          ) : (
            <FileText className="w-5 h-5 text-red-600" />
          )}
          <span className="text-sm font-medium text-gray-700">
            {label}
          </span>
        </div>

        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
        >
          <Eye className="w-4 h-4" />
          Ouvrir
        </a>
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-2 flex justify-center">
        {isImage && (
          <img
            src={fileUrl}
            alt={fileName}
            width="100%"
            height="100%"
            className="w-full h-[200px] rounded border border-gray-100"
          />
        )}

        {isPdf && (
          <iframe
            src={fileUrl}
            title="PDF Preview"
             width="100%"
            height="100%"
            className="w-full h-[200px] rounded border border-gray-100"
          />
        )}

        {!isImage && !isPdf && (
          <div className="flex flex-col items-center text-gray-500 py-6">
            <FileText className="w-10 h-10 mb-2" />
            <span className="text-xs">Aperçu non disponible</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default FileViewer;
