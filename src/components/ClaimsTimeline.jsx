import { FileText, CheckCircle, Clock } from "lucide-react";
import { formatDate } from "../util/helper";

const statusConfig = {
  EN_COURS: {
    color: "bg-yellow-500",
    icon: Clock,
    label: "En cours",
  },
  CLOTURE: {
    color: "bg-green-600",
    icon: CheckCircle,
    label: "Clôturé",
  },
};

const ClaimsTimeline = ({ claims }) => {
 
  return (
    <ol className="relative border-l border-gray-200">
      {claims.map((claim) => {
        const config = statusConfig[claim.status] || {};
        const Icon = config.icon || FileText;

        return (
          <li key={claim.id} className="mb-10 ml-6">
            <span
              className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full text-white ${config.color}`}
            >
              <Icon size={14} />
            </span>

            <time className="block mb-1 text-sm text-gray-400">
              {formatDate(claim.createdAt)}
            </time>

            <h3 className="text-lg font-semibold text-gray-900">
              {claim.sinisterType}
            </h3>

            <p className="text-sm text-gray-600">
              Cause : {claim.cause}
            </p>

            <span className="inline-block mt-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
              {config.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default ClaimsTimeline;