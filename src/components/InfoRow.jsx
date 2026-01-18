const InfoRow = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center justify-content gap-1">
  <Icon className="w-4 h-4 text-gray-400 mr-3" />
    <span className="w-40 text-gray-500">{label}: </span>
    </div>
  
    <span className={`font-medium ${highlight ? "text-blue-700 text-base" : "text-gray-800"}`}>
      {value || "—"}
    </span>
    
  </div>
);
export default InfoRow