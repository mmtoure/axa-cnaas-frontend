import { Shield, User, Users } from "lucide-react";

const RoleBadge = ({ role }) => {
  const config = {
    ADMIN: {
      style: "bg-red-100 text-red-600",
      icon: <Shield size={12} />,
    },
    MANAGER: {
      style: "bg-green-100 text-green-600",
      icon: <Users size={12} />,
    },
    USER: {
      style: "bg-blue-100 text-blue-600",
      icon: <User size={12} />,
    },
  };

  const current = config[role] || {
    style: "bg-gray-100 text-gray-600",
    icon: null,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${current.style}`}
    >
      {current.icon}
      {role}
    </span>
  );
};

export default RoleBadge;