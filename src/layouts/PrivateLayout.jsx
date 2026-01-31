import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;