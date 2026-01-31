import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routeLabels = {
  dashboard: "Dashboard",
  insureds: "Assurés",
  create: "Créer",
  edit: "Modifier",
  groups: "Groupes",
  contracts: "Contrats",
  claims: "Sinistres",
  new: "Nouveau",
  agences: "Agences",
  utilisateurs: "Utilisateurs",
  profiles: "Profils",
  parametres: "Paramètres",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-600">
      <Link to="/dashboard" className="flex items-center gap-1 hover:text-blue-600">
        <Home size={16} />
      </Link>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const label = routeLabels[value] || value;

        return (
          <span key={to} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            {index === pathnames.length - 1 ? (
              <span className="font-semibold text-gray-800">{label}</span>
            ) : (
              <Link to={to} className="hover:text-blue-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;