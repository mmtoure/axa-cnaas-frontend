import {
  IdCard,
  CalendarDays,
  Activity,
  Wallet,
  Percent,
} from "lucide-react";

import { formatDate, formatMoney } from "../util/helper";
import InfoRow from "./InfoRow";
import StatusBadge from "./StatusBadge";
import { ShieldCheck } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { CalendarX } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { WalletCards } from "lucide-react";
import { Receipt } from "lucide-react";
import { FilePlus2 } from "lucide-react";

const ContractCard = ({ contract }) => {
  return (
     <div className="grid grid-cols-1 gap-6">
      {console.log("Contract",contract)}

      {/* Informations contrat */}
      <div className="w-full md:w-2/3 bg-white rounded-sm p-6 shadow-md">
        <h3 className="text-sm font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-700" />
          Informations du contrat
         
        </h3>
         
        <InfoRow
          icon={IdCard}
          label="Numéro de police"
          value={contract.policeNumber}
        />

        <InfoRow
          icon={CalendarCheck}
          label="Date de début"
          value={formatDate(contract.startDate)}
        />

        <InfoRow
          icon={CalendarX}
          label="Date de fin"
          value={formatDate(contract.endDate)}
        />

        <div className="flex justify-content gap-2 items-center pt-3">
            <BadgeCheck className="w-4 h-4" />
            <p className="text-gray-800">Statut du contrat</p>
          <StatusBadge status={contract.status} />
        </div>
      </div>

      {/* Informations financières */}
        <div className="w-full md:w-2/3 bg-white rounded-md p-6 shadow-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <WalletCards className="w-5 h-5 text-blue-700" />
            Informations financières
          </h3>

        <InfoRow
          icon={Receipt}
          label="Taxes"
          value={formatMoney(contract.tax)}
        />

        <InfoRow
          icon={FilePlus2}
          label="Frais accessoires"
          value={formatMoney(contract.accessoryCost)}
        />

        <InfoRow
          icon={WalletCards}
          label="Prime nette"
          value={formatMoney(contract.montantPrime)}
        />

         <InfoRow
          icon={WalletCards}
          label="Prime TTC"
          value={formatMoney(contract.montantPrimeTtc)}
          highlight
        />
      </div>
    </div>
  )
}

export default ContractCard