import { X } from 'lucide-react';
import React from 'react'
import { useMemo } from 'react';
import { useEffect, useState } from 'react'

export const MultiSelectDropdown = ({ regions }) => {
    const [searchText, setSearchText] = useState("");
    const [selectedRegions, setSelectedRegions] = useState([]);
  

const filteredRegions = useMemo(() => {
  const query = searchText.trim().toLowerCase();

  if (!query) return regions;

  return regions.filter((region) =>
    region.name.toLowerCase().includes(query)
  );
}, [searchText, regions]);

const setRegions = (value) => {
    if(selectedRegions.includes(value)) {
        setSelectedRegions(selectedRegions.filter(region => region !== value));
    } else {
        setSelectedRegions([...selectedRegions, value]);
    }
}



    return (
        <div className="border border-gray-200 rounded-md">
            
            <div>
                <div className="flex flex-wrap gap-1 py-1 px-2 text-sm flex-wrap">
                    {selectedRegions.map(regionId => {
                        const region = regions.find(r => r.id === regionId);
                        return region ? <span className='bg-gray-200 text-gray-800 py-1 px-2 rounded-md flex items-center gap-1' key={regionId}>
                            {region.name}
                            <X size={12} className="ml-1 cursor-pointer" onClick={() => setRegions(regionId)} />
                            </span> : null;
                    })}   
                </div>
                <input
                    type="text"
                    placeholder="Rechercher une région..."
                    className="py-2 px-3 w-full outline-none"
                    onKeyUp={(e) => setSearchText(e.target.value)}
                />

            </div>
            <div className="flex flex-col gap-2 border-t-2 border-gray-400 max-h-48 overflow-y-auto">
                {
                    filteredRegions.map(region => (
                        <div key={region.id} className="flex items-center py-2 px-3 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setRegions(region.id)}
                        >
                            <input type="checkbox" className="mr-2" checked={selectedRegions.includes(region.id)} readOnly/>
                            {region.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
