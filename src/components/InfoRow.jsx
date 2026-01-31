const InfoRow = ({ icon: Icon, label, value, highlight }) => (
  <div className="flex items-center justify-content py-2 gap-4 ">
    <div className="flex items-center justify-content gap-2 w-40">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="text-gray-500">{label}: </span>
    </div>
  
    <span className={`font-medium ${highlight ? "text-blue-700 text-base" : "text-gray-800"}`}>
      {value || "—"}
    </span>
    
  </div>
);
export default InfoRow