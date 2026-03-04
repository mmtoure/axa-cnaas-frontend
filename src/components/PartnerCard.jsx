import React from "react";
import { useNavigate } from "react-router-dom";

const PartnerCard = ({ partner }) => {
    const naivigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between">
      
      {/* Logo */}
      <div className="flex justify-center mb-4">
        {partner.logoPartner ? (
          <img
            src={`http://localhost:8080/api/v1.0${partner.logoPartner}`}
            alt={partner.name}
            className="h-20 object-contain"
          />
        ) : (
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
            {partner.code}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {partner.name}
        </h2>
        <p className="text-sm text-gray-500">{partner.email}</p>
        <p className="text-sm text-gray-500">{partner.phoneNumber}</p>
      </div>

      {/* Status */}
      <div className="flex justify-center mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            partner.active
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {partner.active ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Pricings */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {partner.pricings?.length || 0} packages
      </div>

      {/* Action */}
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-900 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        onClick={() => naivigate(`/partners/${partner.id}`)}
        >
          Voir les packages
        </button>
      </div>
    </div>
  );
};

export default PartnerCard;