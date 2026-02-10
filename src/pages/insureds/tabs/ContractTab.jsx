import {
  IdCard,
  CalendarDays,
  Activity,
  Wallet,
  Percent,
} from "lucide-react";
import { formatDate, formatMoney } from "../../../util/helper";
import InfoRow from "../../../components/InfoRow";
import StatusBadge from "../../../components/StatusBadge";
import { ShieldCheck } from "lucide-react";
import { CalendarCheck } from "lucide-react";
import { CalendarX } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { WalletCards } from "lucide-react";
import { Receipt } from "lucide-react";
import { FilePlus2 } from "lucide-react";
import ContractCard from "../../../components/ContractCard";
import { Users } from "lucide-react";
import Card from "../../../components/Card";
import { BedDouble } from "lucide-react";
import { Banknote } from "lucide-react";


const ContractTab = ({ contract }) => {
  if (!contract) return null;


  return (
    <div className="space-y-6">

        {/* HEADER */}
        <div className="bg-slate-50 rounded-md shadow p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              {contract.policeNumber}
            </h2>
            <p className="text-sm opacity-80 flex items-center gap-2">
              <CalendarDays size={16} />
              {contract.startDate} → {contract.endDate}
            </p>
          </div>

          <span className={`px-4 py-1 rounded-full text-sm
          ${contract.status === "ACTIF"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"}`}>
            {contract.status}
          </span>
        </div>

      {/* CAPITAL */}
      <div className="bg-slate-50 rounded-md shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="text-blue-600" />
          <h3 className="font-semibold">Capital</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          <Card label="Capital Max" value={contract.capitalMax} />
          <Card label="Déjà versé" value={contract.capitalDejaVerse} />
          <Card label="Restant" value={contract.capitalMax - contract.capitalDejaVerse} highlight />
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${(contract.capitalDejaVerse / contract.capitalMax) * 100}%` }}
          />
        </div>
      </div>

      {/* HOSPICASH */}
      <div className="bg-slate-50 rounded-md shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <BedDouble className="text-indigo-600" />
          <h3 className="font-semibold">Hospicash</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          <Card label="Plafond nuits" value={contract.plafondNuitsParAn} />
          <Card label="Nuits restantes" value={contract.nuitsRestantes} highlight />
          <Card label="Montant / nuit" value={contract.montantParNuit} />
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${((contract.plafondNuitsParAn - contract.nuitsRestantes) / contract.plafondNuitsParAn) * 100}%` }}
          />
        </div>
      </div>

      {/* PRIMES TABLE */}
      <div className="bg-slate-50 rounded-md shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Banknote className="text-green-600" />
          <h3 className="font-semibold">Détail des primes</h3>
        </div>

        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Élément</th>
              <th className="p-3 text-right">Montant (FCFA)</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">Prime HT</td>
              <td className="p-3 text-right">{contract.montantPrime}</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Frais Accessoires</td>
              <td className="p-3 text-right">{contract.accessoryCost}</td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Taxe</td>
              <td className="p-3 text-right">{contract.tax}</td>
            </tr>

            <tr className="border-t bg-blue-50 font-semibold">
              <td className="p-3">Prime TTC</td>
              <td className="p-3 text-right">{contract.montantPrimeTTC}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default ContractTab;