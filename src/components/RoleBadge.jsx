const RoleBadge = ({ role }) => {
  const styles = {
    ADMIN: "bg-red-500",
    MANAGER: "bg-green-500",
    USER: "bg-blue-500",
  };

  return (
    <span
      className={`px-1S py-1 text-xs font-semibold rounded-lg text-white ${styles[role] || "bg-gray-500"}`}
    >
      {role}
    </span>
  );
};

export default RoleBadge;