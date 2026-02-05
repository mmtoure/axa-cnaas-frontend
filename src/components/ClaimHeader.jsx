const ClaimHeader = ({ claim }) => (
  <div className="flex justify-between items-center mb-4">
    <div>
      <h2 className="text-xl font-semibold text-gray-800">
        Sinistre #{claim?.numeroSinistre}
      </h2>
      <p className="text-sm text-gray-500">
        Prénom et Nom: {claim?.firstName} {claim?.lastName}

      </p>
      <p className="text-sm text-gray-500">
        Déclaré le {new Date(claim?.createdAt).toLocaleDateString("fr-FR")}
      </p>
    </div>

    <span className={`px-3 py-1 rounded-full text-sm font-medium
      ${claim?.status === "ACCEPTE" && "bg-green-100 text-green-700"}
      ${claim?.status === "EN_COURS" && "bg-blue-100 text-blue-700"}
      ${claim?.status === "REJETE" && "bg-red-100 text-red-700"}
    `}>
      {claim?.status}
    </span>
  </div>
);
export default ClaimHeader