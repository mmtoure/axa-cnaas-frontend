export default function KpiCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          {value?.toLocaleString()}
        </h2>
      </div>

      <div className={`p-4 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  );
}