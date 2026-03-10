import { Search } from 'lucide-react';
import { FileSpreadsheet } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetFilters, setFilters } from '../features/insured/insuredSlice';
import { deleteInsured, exportInsuredsExcel, fetchInsureds } from '../features/insured/insuredThunk';
import InsuredList from './InsuredList';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const InsuredFilter = () => {
    const dispatch = useDispatch();
    const { filters, list, content } = useSelector(state => state.insured);
    const [search, setSearch] = useState("");

    const filteredInsureds = list.filter((insured) => {
        const term = search.toLowerCase();

        return (
            insured.firstName?.toLowerCase().includes(term) ||
            insured.lastName?.toLowerCase().includes(term) ||
            insured.phoneNumber?.includes(term)
        );
    });
    const handleChange = (e) => {
        console.log("Filter change:", e.target.name, e.target.value);
        dispatch(setFilters({ [e.target.name]: e.target.value }));
    };

    const handleDelete = (id) => {
        console.log("Deleting insured with ID:", id);
        Swal.fire({
    title: "Supprimer ?",
    text: "Cette action est irréversible",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Oui, supprimer"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteInsured(id)).then(() => {
        Swal.fire(
          "Supprimé!",
          "L'assuré a été supprimé.",
          "success"
        );
      });
    }
  });
};
    useEffect(() => {
        console.log("Current filters in component:", filters);
        dispatch(fetchInsureds(filters));
    }, [filters, dispatch]);

    const handleSearch = () => {
        console.log("Applying filters:", filters);
        dispatch(resetFilters());
        dispatch(fetchInsureds(filters));
    };

    const handleReset = () => {
        dispatch(resetFilters());
        dispatch(fetchInsureds({}));
    };

    const handleExport = () => {
        dispatch(exportInsuredsExcel(filters));
    };
    return (
        <div>
            <div className='p-4 flex justify-between items-center mb-2'>
                <div className="flex flex-col md:flex-row md:items-end gap-2">
                    {/* Date début */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Date début</label>
                        <input
                            type="date"
                            className="border rounded-lg p-2"
                            name="startDate"
                            value={filters?.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Date fin */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600">Date fin</label>
                        <input
                            type="date"
                            className="border rounded-lg p-2"
                            name="endDate"
                            value={filters?.endDate}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un assuré..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-3 py-2 bg-gray-100 rounded-md text-sm
                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-2">
                    <button onClick={handleReset}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Reset
                    </button>
                    {/* Export */}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        <FileSpreadsheet size={18} />
                        Export Excel
                    </button>
                </div>
            </div>
            {/* Liste des assurés */}
            <InsuredList insuredsData={filteredInsureds} onDelete={handleDelete} />
        </div>

    );
};


export default InsuredFilter
