export default function Loader({ text }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-3 shadow-lg">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-900 border-t-transparent"></div>
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  );
}