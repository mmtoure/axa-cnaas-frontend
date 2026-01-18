const StatusBadge = ({ status }) => {
  const styles = {
    ACTIF: "bg-green-100 text-green-700",
    EXPIRE: "bg-orange-100 text-orange-700",
    ANNULE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};
export default StatusBadge