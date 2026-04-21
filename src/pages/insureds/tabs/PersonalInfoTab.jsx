import {
  User,
  Phone,
  CalendarDays,
  HeartHandshake,
} from "lucide-react";
import InfoRow from "../../../components/InfoRow";
import { User2 } from "lucide-react";
import { UserIcon } from "lucide-react";
import { UserCircle2 } from "lucide-react";
import { formatDate } from "../../../util/helper";
import { Folder } from "lucide-react";

const PersonalInfoTab = ({ insured }) => {
  const beneficiary = insured?.beneficiary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Assuré */}
      <div className="bg-white rounded-lg p-5">
        <div className="flex items-center justify-content gap-1 mb-4">
          <User2 className="w-4 h-4"/>
          <h2 className="text-sm font-semibold text-gray-700">
            Informations de l’assuré
          </h2>

          <hr className="mt-2 border-gray-200" />
        </div>

        <InfoRow
          icon={User}
          label="Nom complet"
          value={`${insured.firstName} ${insured.lastName}`}
        />

        <InfoRow
          icon={Phone}
          label="Téléphone"
          value={insured.phoneNumber}
        />

        <InfoRow
          icon={CalendarDays}
          label="Date de naissance"
          value={formatDate(insured.dateOfBirth)}
        />

        {/* Bénéficiaire */}
     
        <div className="flex items-center justify-content gap-1 mt-4 mb-4">
          <User2 className="w-4 h-4"/>
          <h2 className="text-sm font-semibold text-gray-700">
            Informations de l’assuré
          </h2>
        </div>
        {beneficiary ? (
          <>
            <InfoRow
              icon={User}
              label="Nom complet"
              value={`${beneficiary.firstName} ${beneficiary.lastName}`}
            />
            <InfoRow
              icon={Phone}
              label="Téléphone"
              value={beneficiary.phoneNumber}
            />

            <InfoRow
              icon={CalendarDays}
              label="Date de naissance"
              value={formatDate(beneficiary.dateOfBirth)}
            />
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">
            Aucun bénéficiaire enregistré
          </p>
        )}
      
      </div>
       {/* Logo */}
      <div className="bg-white rounded-lg p-5">
         <div className="flex items-center justify-content gap-1 mb-4">
          <Folder className="w-4 h-4"/>
          <h2 className="text-sm font-semibold text-gray-700">
              Preuve de paiement
          </h2>

          <hr className="mt-2 border-gray-200" />
        </div>
        {insured.proofPayment ? (
          <img
            src={`http://localhost:8080/api/v1.0${insured.proofPayment}`}
            alt="Proof of Payment"
            className="w-full object-cover"
          />
        ) : (
          <p className="text-sm text-gray-400 italic">
            Aucun justificatif de paiement fourni
          </p>
        ) }
      </div>
    </div>
  );
};

export default PersonalInfoTab;