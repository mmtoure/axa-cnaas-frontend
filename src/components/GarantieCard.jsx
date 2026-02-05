import { HeartOffIcon } from "lucide-react";
import { formatMoney } from "../util/helper";
import Progress from "./Progress";
import { HeartPlus } from "lucide-react";
import { Skull } from "lucide-react";
import { TriangleAlert } from "lucide-react";

const GarantieCard = ({ g }) => {
  return (
    <div className="">
        
        <div className="flex flex-col justify-content gap-4 hover:text-white bg-gray-50 rounded-lg shadow p-4 border border-gray-100 hover:bg-blue-800 hover:text-white transition-colors duration-300 space-y-4 mb-2">
            <div className="flex items-center gap-2 space-y-1 text-sm">
                <HeartPlus className="w-8 h-8 text-green-500 mb-2" />
                <p className="font-semibold mb-2"> Nuits d'hospitalisation </p>
            </div>

            <Progress
                used={g.plafondNuitsParAn - g.nuitsRestantes}
                max={g.plafondNuitsParAn}
            />

            <div className="flex flex-col justify-center gap-2 space-y-1 text-sm">
                
                <p>Plafond nuits/an : <b>{g.plafondNuitsParAn} jpurs</b></p>
                <p>Nuits restantes : <b>{g.nuitsRestantes} jour</b>s</p>
            </div>
        </div>
        <div className="flex flex-col justify-content gap-4 hover:text-white bg-gray-50 rounded-lg shadow p-4 border border-gray-100 hover:bg-blue-800 hover:text-white transition-colors duration-300 space-y-4 mb-2">
            <div className="flex items-center gap-2 space-y-1 text-sm">
                <TriangleAlert className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2"> Invalidité </h3>
            </div>
            <div className="flex flex-col justify-center gap-2 space-y-1 text-sm">
                <Progress
                    used={g.capitalDejaVerse}
                    max={g.capitalMax}
                />
          <p>Capital max : <b>{formatMoney(g.capitalMax)}</b></p>
          <p>Déjà versé : <b>{formatMoney(g.capitalDejaVerse ?? 0)}</b></p>
          <p>Restant à verser : <b>{formatMoney((g.capitalMax ?? 0) - (g.capitalDejaVerse ?? 0))}</b></p>
        </div>
        </div>
      

            
          <div className="flex flex-col justify-content gap-4 hover:text-white bg-gray-50 rounded-lg shadow p-4 border border-gray-100 hover:bg-blue-800 hover:text-white transition-colors duration-300 space-y-4 mb-2">
            <div className="flex items-center gap-2 space-y-1 text-sm">
                <Skull className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2"> CAPITAL FUNERAIRE </h3>
            </div>
            <div className="flex flex-col justify-center gap-2 space-y-1 text-sm">
                <Progress
                    used={g.capitalDejaVerse}
                    max={g.capitalMax}
                />
          <p>Capital max : <b>{formatMoney(g.capitalMax)}</b></p>
          <p>Déjà versé : <b>{formatMoney(g.capitalDejaVerse ?? 0)}</b></p>
          <p>Restant à verser : <b>{formatMoney((g.capitalMax ?? 0) - (g.capitalDejaVerse ?? 0))}</b></p>
        </div>
        </div>
      

    </div>
  );
};
export default GarantieCard;