import StatusBadge from "./StatusBadge";
import StatusBar from "./StatusBar";

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
        Téléphone: {claim?.phoneNumber}
      </p>
      <p className="text-sm text-gray-500">
        Déclaré le {new Date(claim?.createdAt).toLocaleDateString("fr-FR")}
      </p>
     
    </div>


  <StatusBadge status={claim?.status} />
  </div>
);
export default ClaimHeader