const Card = ({ label, value, highlight }) => (
  <div className={`p-4 rounded-lg border ${
    highlight ? "border-blue-500 bg-blue-50" : "border-gray-300"
  }`}>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);
export default Card;