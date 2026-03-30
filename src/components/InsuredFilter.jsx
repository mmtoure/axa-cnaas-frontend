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
            <div className="p-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-end mb-2">

                {/* Filters */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">

                    {/* Date début */}
                    <div className="flex flex-col w-full sm:w-auto">
                        <label className="text-sm text-gray-600">Date début</label>
                        <input
                            type="date"
                            className="border rounded-lg p-2 w-full"
                            name="startDate"
                            value={filters?.startDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Date fin */}
                    <div className="flex flex-col w-full sm:w-auto">
                        <label className="text-sm text-gray-600">Date fin</label>
                        <input
                            type="date"
                            className="border rounded-lg p-2 w-full"
                            name="endDate"
                            value={filters?.endDate}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64 mt-5">
                        <input
                            type="text"
                            placeholder="Rechercher un assuré..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-3 bg-gray-100 rounded-md text-sm
        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    </div>

                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">

                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        Reset
                    </button>

                    <button
                        onClick={handleExport}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        <FileSpreadsheet size={18} />
                        Export Excel
                    </button>

                </div>

            </div>

            {/* Liste */}
            <InsuredList
                insuredsData={filteredInsureds}
                onDelete={handleDelete}
            />
        </div>

    );
};


export default InsuredFilter
