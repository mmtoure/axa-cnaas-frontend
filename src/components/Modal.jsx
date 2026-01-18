import React from 'react'
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <div className="relative w-full max-w-2xl max-h-[90vh]">
                <div className="bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-xl">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 bg-gray-50 rounded-lg text-sm w-9 h-9 inline-flex items-center transition-colors duration-200 cursor-pointer justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                           <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body (scrollable) */}
                    <div className="text-gray-700 p-5 md:p-6 overflow-y-auto">
                        {/* contenu du formulaire */}
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal
