const Progress = ({ used, max }) => {
  const percent = Math.round((used / max) * 100);

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>Utilisation</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-green-500 rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
export default Progress;