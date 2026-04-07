import { useState, useEffect, useRef } from "react";

const SearchSelect = ({ data, onSelect, placeholder = "Rechercher..." }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [isSelecting, setIsSelecting] = useState(false);

    const ref = useRef();

    // 🔥 FILTRAGE + DEBOUNCE
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.length >= 2) {
                const filtered = data
                    .filter((item) =>
                        item.value.toLowerCase().includes(query.toLowerCase())
                    )
                    .slice(0, 20); // limite

                setResults(filtered);
                if (!isSelecting) {
                    setShowDropdown(true);
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, data,]);

    // 🔥 CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 🔥 SELECT ITEM
    const handleSelect = (item) => {
        setIsSelecting(true); // 🔥 bloque réouverture
        setQuery(item.value);
        setSelectedKey(item.category);
        setResults([]);
        setShowDropdown(false);
        onSelect && onSelect(item.category);
        // 🔥 reset flag après rendu
        setTimeout(() => {
            setIsSelecting(false);
        }, 100);
    };

    // 🔥 CLEAR INPUT
    const handleClear = () => {
        setQuery("");
        setResults([]);
        setSelectedKey(null);
        setShowDropdown(false);
    };

    return (
        <div ref={ref} className="relative w-full max-w-md">
            <label className="block mb-1 text-sm font-medium text-gray-700">
                {placeholder}
            </label>    

            {/* INPUT */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Tapez au moins 2 caractères..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedKey(null);
                    }}
                    onFocus={() => {
                        if (isSelecting) return; // 🔥 empêche réouverture

                        if (query.length >= 2 && results.length > 0) {
                            setShowDropdown(true);
                        }
                    }}
                    className="w-full border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                {/* ❌ CLEAR BUTTON */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* RESULTATS */}
            {showDropdown && (
                <div className="absolute w-full bg-white border mt-1 rounded-md shadow-lg z-10">

                    {results.length > 0 ? (
                        <ul className="max-h-60 overflow-y-auto">
                            {results.map((item) => (
                                <li
                                    key={item.id}
                                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => handleSelect(item)} // 🔥 IMPORTANT
                                >
                                    {item.value}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        query.length >= 2 && (
                            <div className="p-2 text-gray-500 text-sm">
                                Aucun résultat
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchSelect;