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


const ContractTab = ({ contract }) => {
  if (!contract) return null;

  return (
    <ContractCard contract={contract} />
   
  );
};

export default ContractTab;